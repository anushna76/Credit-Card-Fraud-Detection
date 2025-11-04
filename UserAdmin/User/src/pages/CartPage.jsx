import { useCart } from '../hooks/useCart';
import { Link } from 'wouter';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalAmount, getTotalItems } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (cartItems.length === 0) {
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
            background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 30px'
          }}>
            <ShoppingBag size={40} color="white" />
          </div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#2d3748',
            marginBottom: '16px'
          }}>Your Cart is Empty</h2>
          <p style={{
            color: '#718096',
            fontSize: '16px',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Looks like you haven't added any items to your cart yet. 
            Start shopping to fill it up!
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
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
            }}>
              Continue Shopping
            </button>
          </a>
        </div>
      </div>
    );
  }

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
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#2d3748',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <ShoppingBag size={32} color="#667eea" />
            Shopping Cart
          </h1>
          <p style={{
            color: '#718096',
            fontSize: '16px'
          }}>
            You have {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '30px',
          '@media (max-width: 1024px)': {
            gridTemplateColumns: '1fr'
          }
        }}>
          {/* Cart Items */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '20px',
                  border: '2px solid #f7fafc',
                  borderRadius: '16px',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    borderColor: '#667eea',
                    transform: 'translateY(-2px)'
                  }
                }}>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: '700',
                    color: 'white',
                    flexShrink: 0
                  }}>
                    {item.name.charAt(0)}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#2d3748',
                      marginBottom: '8px'
                    }}>
                      {item.name}
                    </h3>
                    <p style={{
                      color: '#718096',
                      fontSize: '14px',
                      marginBottom: '12px'
                    }}>
                      {item.category}
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: '#667eea'
                      }}>
                        {formatPrice(item.price)}
                      </span>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: '#f7fafc',
                          borderRadius: '12px',
                          padding: '8px'
                        }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            style={{
                              background: '#e2e8f0',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '8px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <Minus size={16} />
                          </button>
                          
                          <span style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            minWidth: '30px',
                            textAlign: 'center'
                          }}>
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            style={{
                              background: '#667eea',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '8px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            background: '#fed7d7',
                            color: '#e53e3e',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#2d3748',
              marginBottom: '24px'
            }}>
              Order Summary
            </h2>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#718096', fontSize: '16px' }}>
                  Subtotal ({getTotalItems()} items)
                </span>
                <span style={{ fontSize: '16px', fontWeight: '600' }}>
                  {formatPrice(getTotalAmount())}
                </span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#718096', fontSize: '16px' }}>
                  Shipping
                </span>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#38a169' }}>
                  Free
                </span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: '#718096', fontSize: '16px' }}>
                  Tax
                </span>
                <span style={{ fontSize: '16px', fontWeight: '600' }}>
                  {formatPrice(getTotalAmount() * 0.08)}
                </span>
              </div>

              <div style={{
                height: '1px',
                background: '#e2e8f0',
                margin: '8px 0'
              }}></div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '20px', fontWeight: '700', color: '#2d3748' }}>
                  Total
                </span>
                <span style={{ fontSize: '24px', fontWeight: '700', color: '#667eea' }}>
                  {formatPrice(getTotalAmount() * 1.08)}
                </span>
              </div>
            </div>

            <a href="/payment">
              <button style={{
                width: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                padding: '16px 24px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <CreditCard size={20} />
                Proceed to Payment
              </button>
            </a>

            <Link href="/search-products">
              <button style={{
                width: '100%',
                background: 'transparent',
                color: '#667eea',
                border: '2px solid #667eea',
                borderRadius: '16px',
                padding: '16px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}