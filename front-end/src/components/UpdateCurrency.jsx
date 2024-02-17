import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

function UpdateCurrency() {
  const [updateCode, setUpdateCode] = useState('');
  const [amount, setAmount] = useState('');
  const [putData, setPutData] = useState(null);

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
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label className="Update-label"
                 htmlFor="updateCode" >Currency Code:</label>
          <input
            className="Update-input"
            type="text"
            id="updateCode"
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
        <button  className="Update-button" type="submit">Update</button>
      </form>

      {putData && (
        <div className="put-data">
          <h3>Updated:</h3>
          <p>Currency Code: {putData.currencyCode}</p>
          <p>New Conversion Rate: {putData.conversionRate}</p> 
        </div>
      )}
    </div>
  );
}

export default UpdateCurrency;
