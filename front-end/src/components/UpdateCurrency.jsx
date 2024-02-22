import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

function UpdateCurrency({ currenciesData }) {
  
  const [updateCode, setUpdateCode] = useState('');//selected currencyCode
  const [amount, setAmount] = useState(0.0);//amount result
  const [putData, setPutData] = useState(null); // to store update result

  // Func. to change in selected currencyCode
  const handleChange = (event) => {
    setUpdateCode(event.target.value);
  };
  
  // Func. to handle currency update
  const handleUpdate = async (e) => {
    e.preventDefault();
  
    try {
      // Find the currency in the currenciesData array based on selected code...
      const updateId = currenciesData.find(currency => currency.currencyCode === updateCode);
      // If currency not found, return...
      if (!updateId) {
        return;
      }
      // PUT req to update currency wid specified ID nd amount..
     axios.put(`http://localhost:3001/api/currency/${updateId.id}/${amount}`).then((response)=>{
      console.log(response.data);//if log successful..
      setPutData(response.data);
     })
      
    } catch (error) {
      // If error occurs..(error handlin')
      console.error('Error updating currency:', error);
      setPutData(`Failed to update currency with code ${updateCode}`);
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
