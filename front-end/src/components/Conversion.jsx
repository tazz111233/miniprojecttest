import React, { useState } from 'react';
import '../index.css';

function Conversion({ currenciesData }) {
 const [convertCode, setConvertCode] = useState(''); 

  const handleChange = (event) => {
    setConvertCode(event.target.value);
    };
    
  return (
    <div className="Conversion-container">
      <h2 className="title">Convert Currency</h2>
      <select className="select-field" value={convertCode} onChange={handleChange}>
        <option value="">Select code</option>
        {currenciesData.map(currency => (
          <option key={currency.id} value={currency.currencyCode}>{currency.currencyCode}</option>
        ))}
      </select>
      <form>
        <div className="form-field">
          <label htmlFor="currency-from">Currency Code From:</label>
          <input className="input-field"
                 type="text" 
                 id="currency-from"  />
        </div>
        <div className="form-field">
          <label htmlFor="amount">Amount:</label>
          <input className="input-field"
                 type="number" 
                 id="amount"  />
        </div>
        <div className="form-field">
          <label htmlFor="currency-to">Currency Code To:</label>
          <input className="input-field"
                 type="text" 
                 id="currency-to"  />
        </div>
        <button className="convert-button"
                 type="submit" >Convert</button>
      </form>
    </div>
  );
}

export default Conversion;
