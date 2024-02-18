import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

function UpdateCurrency({ currenciesData }) {
  const [updateCode, setUpdateCode] = useState('');
  const [amount, setAmount] = useState('');
  const [putData, setPutData] = useState(null);

  const handleChange = (event) => {
    setUpdateCode(event.target.value);
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:3001/api/currency/2/' + amount, {
        currencyCode: updateCode,
      });
      console.log(response.data);
      setPutData(response.data);
      setUpdateCode('');
      setAmount('');
    } catch (error) {
      console.error('Failed to Update currency:', error);
    }
  };

  return (
    <div className="UpdateCurrency-container">
      <h2>Update Currency</h2>
      <select className="select-Ufield" value={updateCode} onChange={handleChange}>
            <option value="">Select code</option>
            {currenciesData.map(currency => (
              <option key={currency.id} value={currency.currencyCode}>{currency.currencyCode}</option>
            ))}
          </select>
      <form onSubmit={handleUpdate} className="form-container">
        <div className="form-group">
          <label htmlFor="updateCode" className="UpdateCurrency-label">Currency Code:</label>
          <input
            className="Update-input"
            type="text"
            id="update"
            value={updateCode}
            onChange={(e) => setUpdateCode(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount" className="UpdateCurrency-label">Amount:</label>
          <input
            className="Update-input"
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button className="Update-button" type="submit">Update</button>
        </div>
      </form>

      {putData && (
        <div className="put-data">
          <h3>Updated:</h3>
          <p>Currency Code: <strong>{putData.currencyCode}</strong></p>
          <p>New Conversion Rate: <strong>{putData.conversionRate}</strong></p> 
        </div>
      )}
    </div>
  );
}

export default UpdateCurrency;
