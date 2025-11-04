
import { useState, useEffect, useContext } from 'react';
import { useCart } from '../hooks/useCart';
import { UserDataContext } from '../components/Context/UserContext'; // Updated to UserDataContext
import { Link } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { products } from '../lib/data';
 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function PaymentPage() {
  const { cartItems, getTotalAmount, clearCart } = useCart();
  const { user, accounts, cardRequests, loading } = useContext(UserDataContext);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [isFraudulent, setIsFraudulent] = useState(false);
  const[billsummmary, setBillSummary] = useState([]);
  const {url}=useContext(UserDataContext)
  const [formData, setFormData] = useState({
    cardNumber: '',
    cvv: '',
    cardholderName: user?.first || '',
    email: user?.email || '',
    billingAddress: user?.street || '',
    city: user?.city || '',
    zipCode: user?.zip || ''
  });
  const [transactionPreview, setTransactionPreview] = useState([]);

  // Log user, accounts, cardRequests, and transaction preview
  useEffect(() => {
    if (!loading && user && cartItems.length > 0) {
    

   
if (!loading && user && cartItems.length > 0 && formData.cardNumber) {
  const totalAmount = cartItems.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    return product ? sum + parseFloat(product.price)  : sum;
  }, 0);

  const representativeProduct = products.find((p) => p.id === cartItems[0]?.id); // Use the first product for details

  if (representativeProduct) {
    const trans_num = Math.random().toString(36).substring(2, 15);
    const trans_date_trans_time = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const unix_time = Math.floor(new Date().getTime() / 1000);
    // Including tax
    const transaction = {
      trans_date_trans_time,
      cc_num: formData.cardNumber.replace(/\s/g, ''),
      merchant: representativeProduct.merchant,
      category: representativeProduct.category,
      amt: totalAmount.toFixed(2),
      first: user.first,
      last: user.last,
      gender: user.gender,
      street: user.street,
      city: user.city,
      state: user.state,
      zip: user.zip,
      lat: user.lat || 0, // Placeholder, fetched by backend
      long: user.long || 0, // Placeholder, fetched by backend
      city_pop: user.city_pop,
      job: user.job,
      dob: new Date(user.dob).toISOString().split('T')[0],
      trans_num,
      unix_time,
      merch_lat: 0, // Placeholder, fetched by backend
      merch_long: 0, // Placeholder, fetched by backend
      merch_zipcode: representativeProduct.merch_zipcode
    };

    setTransactionPreview([transaction]); // Wrap in array to maintain format
    console.log('Transaction Preview:', [transaction]);
  }
}
    }

  }, [loading, user, cartItems, formData.cardNumber]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return;
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 3) return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const validateCardDetails = () => {
  return cardRequests.find(
    (card) =>
      String(card.cardNumber).replace(/\s/g, '') === formData.cardNumber.replace(/\s/g, '') &&
      String(card.cvv) === String(formData.cvv) &&
      String(card.status).toLowerCase() === 'approved'
  );
};
  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);
    setIsFraudulent(false);

    try {
      // Validate card number and CVV
      const card = validateCardDetails();
      if (!card) {
        throw new Error('Invalid card number or CVV. Please check your details.');
      }

      // Process each cart item as a separate transaction
      for (const item of cartItems) {
        const product = products.find((p) => p.id === item.id);
        if (!product) {
          throw new Error(`Product with ID ${item.id} not found`);
        }

       
    // Including tax
  const transactionData = {
  cardNumber: formData.cardNumber.replace(/\s/g, ''),
  cvv: formData.cvv,
  amt: totalAmount.toFixed(2),
  merchant: product.merchant,
  category: product.category,
  merch_zipcode: product.merch_zipcode

    };
  
        console.log('Transaction Data:', transactionData);
   
     const response = await axios.post(`${url}/users/buy`, transactionData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });

    // Check if transaction is flagged as fraudulent
    if (response.data.transaction.is_fraud) {
      setIsFraudulent(true);
      throw new Error('Transaction flagged as potentially fraudulent');
    }
  }

  setPaymentSuccess(true);
  clearCart();
} catch (err) {
  // Show toast for insufficient balance
  if (
    err.response &&
    err.response.data &&
    err.response.data.message === 'Insufficient balance'
  ) {
    toast.error('Insufficient account balance for this transaction.');
  } else {
    setError(err.message || 'Payment processing failed. Please try again.');
  }
} finally {
  setIsProcessing(false);
}
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <p style={{ color: 'white', fontSize: '24px' }}>Loading...</p>
      </div>
    );
  }

  if (cartItems.length === 0 && !paymentSuccess) {
    return (
            
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '60px 40px',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          width: '100%'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #fbb6ce 0%, #f687b3 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 30px'
          }}>
            <AlertCircle size={40} color="white" />
          </div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#2d3748',
            marginBottom: '16px'
          }}>No Items to Pay</h2>
          <p style={{
            color: '#718096',
            fontSize: '16px',
            marginBottom: '40px'
          }}>
            Your cart is empty. Add some items before proceeding to payment.
          </p>
          <a href="/search-products">
            <button style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Start Shopping
            </button>
          </a>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '60px 40px',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          width: '100%'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 30px',
            animation: 'pulse 2s infinite'
          }}>
            <Check size={50} color="white" />
          </div>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#2d3748',
            marginBottom: '16px'
          }}>Payment Successful!</h2>
          <p style={{
            color: '#718096',
            fontSize: '18px',
            marginBottom: '30px',
            lineHeight: '1.6'
          }}>
            Thank you for your purchase! Your order has been confirmed and will be processed shortly.
          </p>
          <div style={{
            background: '#f7fafc',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '40px'
          }}>
            <p style={{
              color: '#4a5568',
              fontSize: '16px',
              marginBottom: '8px'
            }}>
              Order Total: <strong style={{ color: '#48bb78' }}>{formatPrice(getTotalAmount() * 1.08)}</strong>
            </p>
            <p style={{
              color: '#718096',
              fontSize: '14px'
            }}>
              Confirmation email sent to {formData.email}
            </p>
          </div>
          <a href="/dashboard">
            <button style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginRight: '16px'
            }}>
              Go to Dashboard
            </button>
          </a>
          <a href="/search-products">
            <button style={{
              background: 'transparent',
              color: '#667eea',
              border: '2px solid #667eea',
              borderRadius: '12px',
              padding: '14px 30px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Continue Shopping
            </button>
          </a>
        </div>
      </div>
    );
  }

  if (isFraudulent) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '60px 40px',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          width: '100%'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 30px'
          }}>
            <AlertCircle size={40} color="white" />
          </div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#2d3748',
            marginBottom: '16px'
          }}>Transaction Declined</h2>
          <p style={{
            color: '#718096',
            fontSize: '16px',
            marginBottom: '40px'
          }}>
            This transaction has been flagged as potentially fraudulent. Please contact support for assistance.
          </p>
          <Link href="/dashboard">
            <button style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const totalAmount = getTotalAmount() * 1.08;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <Link href="/cart">
            <button style={{
              background: '#f7fafc',
              border: 'none',
              borderRadius: '12px',
              padding: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ArrowLeft size={20} color="#667eea" />
            </button>
          </Link>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#2d3748',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Lock size={32} color="#667eea" />
              Secure Payment
            </h1>
            <p style={{
              color: '#718096',
              fontSize: '16px'
            }}>
              Complete your purchase securely
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '30px'
        }}>
          {/* Payment Form */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
          }}>
            {error && (
              <div style={{
                background: '#fed7d7',
                color: '#c53030',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <AlertCircle size={20} />
                {error}
              </div>
            )}
            <form onSubmit={handlePayment}>
              {/* Credit Card Section */}
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#2d3748',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <CreditCard size={24} color="#667eea" />
                  Payment Details
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '20px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#4a5568',
                      marginBottom: '8px'
                    }}>
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={formData.cardholderName}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '16px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '16px',
                        transition: 'all 0.3s ease',
                        outline: 'none'
                      }}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#4a5568',
                      marginBottom: '8px'
                    }}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '16px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '16px',
                        transition: 'all 0.3s ease',
                        outline: 'none'
                      }}
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#4a5568',
                        marginBottom: '8px'
                      }}>
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '16px',
                          border: '2px solid #e2e8f0',
                          borderRadius: '12px',
                          fontSize: '16px',
                          transition: 'all 0.3s ease',
                          outline: 'none'
                        }}
                        placeholder="MM/YY"
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#4a5568',
                        marginBottom: '8px'
                      }}>
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '16px',
                          border: '2px solid #e2e8f0',
                          borderRadius: '12px',
                          fontSize: '16px',
                          transition: 'all 0.3s ease',
                          outline: 'none'
                        }}
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                style={{
                  width: '100%',
                  background: isProcessing 
                    ? 'linear-gradient(135deg, #a0aec0 0%, #718096 100%)'
                    : 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '20px',
                  fontSize: '18px',
                  fontWeight: '700',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 30px rgba(72, 187, 120, 0.3)'
                }}
              >
                {isProcessing ? 'Processing Payment...' : `Pay ${formatPrice(totalAmount)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            height: 'fit-content',
            position: 'sticky',
            top: '20px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#2d3748',
              marginBottom: '20px'
            }}>
              Order Summary
            </h3>

            <div style={{ marginBottom: '20px' }}>
              {cartItems.slice(0, 3).map((item) => (
                <div key={item.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: 'white'
                  }}>
                    {item.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#2d3748',
                      marginBottom: '4px'
                    }}>
                      {item.name}
                    </p>
                    <p style={{
                      fontSize: '12px',
                      color: '#718096'
                    }}>
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#667eea'
                  }}>
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
              {cartItems.length > 3 && (
                <p style={{
                  fontSize: '14px',
                  color: '#718096',
                  textAlign: 'center',
                  marginTop: '8px'
                }}>
                  +{cartItems.length - 3} more items
                </p>
              )}
            </div>

            <div style={{
              borderTop: '1px solid #e2e8f0',
              paddingTop: '16px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <span style={{ color: '#718096' }}>Subtotal</span>
                <span>{formatPrice(getTotalAmount())}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <span style={{ color: '#718096' }}>Tax</span>
                <span>{formatPrice(getTotalAmount() * 0.08)}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '18px',
                fontWeight: '700',
                color: '#2d3748',
                paddingTop: '8px',
                borderTop: '1px solid #e2e8f0'
              }}>
                <span>Total</span>
                <span style={{ color: '#667eea' }}>{formatPrice(totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    
  );
  
}