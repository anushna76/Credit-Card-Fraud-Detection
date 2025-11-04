import React, { createContext, useState,useEffect } from "react";
import axios from "axios";

export const AdminDataContext = createContext();

const AdminContext = ({ children }) => {
  const url = "https://frauddetection-9j46.onrender.com";
  const [admin, setAdmin] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [cardRequests, setCardRequests] = useState([]);
  const [depositRequests, setDepositRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]); 
  const [transactions, setTransactions] = useState([]);

 
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLoading(false);
      return;
    }
    axios
      .get(`${url}/admin/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAdmin(res.data);
        setUserRequests(res.data.userRequests || []);
        setCardRequests(res.data.cardRequests || []);
        setDepositRequests(res.data.depositRequests || []);
        setAccounts(res.data.useraccount || [])

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  //fetching all transactions

  useEffect(()=>{
    const token= localStorage.getItem('adminToken')
    if(!token) return 

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${url}/admin/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
    fetchTransactions();
  },[])
 
  

  return (
    <div>
      <AdminDataContext.Provider
        value={{
          url,
          admin,
          userRequests,
          setUserRequests,
          cardRequests,
          setCardRequests,
          depositRequests,
          setDepositRequests,
          transactions,
          setTransactions,
          loading,
        }}
      >
        {children}
      </AdminDataContext.Provider>
    </div>
  );
};

export default AdminContext;
