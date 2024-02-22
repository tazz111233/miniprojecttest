import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import Login from './Login';
import Conversion from './Conversion';
import AddCurrency from './AddCurrency';
import UpdateCurrency from './UpdateCurrency';
import Delete from './Delete';
import logo from '../utils/logo.jpg';

function App() {
  const [currencyData, setCurrencyData] = useState([]); //store fetched currency data..

  useEffect(() => {
    fetchCurrencyData();
  }, []);

  const fetchCurrencyData = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/currency'); 
      setCurrencyData(res.data); // Update state wid fetched currency data..
    } catch (err) { 
      console.error('Error fetching currency data:', err); //log err if fetchin' fails..
    }
  };
 

  return (
    <>
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Currency-Country</h1>
      </div>
      <Login />
      <hr />
      <Conversion currenciesData={currencyData} />
      <hr />
      <AddCurrency currenciesData={currencyData}/>
      <hr />
      <UpdateCurrency currenciesData={currencyData} />
      <hr />
      <Delete currenciesData={currencyData} />
      <hr />
    </>
  );
}

export default App;
