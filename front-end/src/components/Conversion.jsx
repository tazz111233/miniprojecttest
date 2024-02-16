import React from 'react';
import '../index.css';

function Conversion() {
  return (
    <div className="Conversion-container">
      <h2 className="title">Currency Converter</h2>
      <form>
        <div className="form-field">
          <label For="currency-from">Currency Code From:</label>
          <input className="input-field"
                 type="text" 
                 id="currency-from"  />
        </div>
        <div className="form-field">
          <label For="amount">Amount:</label>
          <input className="input-field"
                 type="number" 
                 id="amount"  />
        </div>
        <div className="form-field">
          <label For="currency-to">Currency Code To:</label>
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
