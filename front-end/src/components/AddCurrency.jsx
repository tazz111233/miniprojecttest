import React, { useState } from 'react';
import axios from 'axios';
import '../index.css'; 

function AddCurrency({ currenciesData }) {
  const [currencyCode, setCurrencyCode] = useState('');
  const [countryId, setCountryId] = useState('');
  const [conversionRate, setConversionRate] = useState('');
  const [responseData, setResponseData] = useState(null); // State to hold res data..
  const [error, setError] = useState(null); // State to hold err..

  const handleChange = (event) => {
    setCurrencyCode(event.target.value);
    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/currency', {
        currencyCode,
        countryId: parseInt(countryId),
        conversionRate: parseFloat(conversionRate) 
      });
      console.log('New Currency Created:', response.data);
      setResponseData(response.data); 
      setError(null); 
      setCurrencyCode('');
      setCountryId('');
      setConversionRate('');
    } catch (error) {
      console.error('Error adding currency:', error);
      setError('Failed to add currency. Please try again...'); 
    }
  };

  return (
    <div className="add-currency-container"> 
      <h2>Add Currency</h2>
      <select className="select-field" value={currencyCode} onChange={handleChange}>
        <option value="">Select code</option>
        {currenciesData.map(currency => (
          <option key={currency.id} value={currency.currencyCode}>{currency.currencyCode}</option>
        ))}
      </select>
      <form onSubmit={handleSubmit} className="currency-form"> 
        <div className="form-group"> 
          <label htmlFor="currencyCode">Currency Code:</label>
          <input type="text" 
                 id="currencyCode" 
                 value={currencyCode} 
                 onChange={(e) => setCurrencyCode(e.target.value)} required />
        </div>
        <div className="form-group"> 
          <label htmlFor="countryId">Country ID:</label>
          <input type="number" 
                 id="countryId" 
                 value={countryId} 
                 onChange={(e) => setCountryId(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="conversionRate">Conversion Rate:</label>
          <input type="number" 
                 id="conversionRate" 
                 value={conversionRate} 
                 onChange={(e) => setConversionRate(e.target.value)} required />
        </div>
        <button type="submit" className="submit-button">Add</button> 
      </form>
      {responseData && ( 
        <div className="display-data">
          <h3>New Currency Created:</h3>
          <p>Currency Code: <strong>{responseData.currencyCode}</strong></p>
          <p>Country ID: <strong>{responseData.countryId}</strong></p>
          <p>Conversion Rate: <strong>{responseData.conversionRate}</strong> </p>
        </div>
      )}
      {error && ( 
        <p>{error}</p>
      )}
    </div>
  );
}

export default AddCurrency;
