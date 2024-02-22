import React, { useState } from 'react';
import axios from 'axios';
import '../index.css'; 

const DeleteId = ({ currenciesData }) => {
  const [deleteCode, setDeleteCode] = useState(''); //store the selected currencyCode..
  const [msg, setMsg] = useState(''); //store the msg after deletion..
  const handleChange = (event) => {
    setDeleteCode(event.target.value); //Update the selected currencyCode..
  };

  const handleDelete = async () => {
    try {
      const deleteId = currenciesData.find(currency => currency.currencyCode === deleteCode); // Find the currency to del..
      if (!deleteId) {
        return; //If currency nt found, exit..
      }
      await axios.delete(`http://localhost:3001/api/currency/${deleteId.id}`); //Send del req to del the currency..
      const updating = await axios.get('http://localhost:3001/api/currency')
      console.log(updating.data); 
      setMsg(`Deleted ID wid code:  ${deleteCode}`); //set success msg..
    } catch (error) {
      console.error('Error deleting currency:', error); // log err if deletion fails..
      setMsg(`Failed to delete currency with code ${deleteCode}`); //set err msg..
    }
  };
  
  
  return (
    <div className="delete-container">
      <h2>Delete Currency</h2>
      <p className="codes">Currency Codes:</p>
      
      <select className="select-field" value={deleteCode} onChange={handleChange}>
        <option value="">Select code</option>
        {currenciesData.map(currency => (
          <option key={currency.id} value={currency.currencyCode}>{currency.currencyCode}</option>
        ))}
      </select>


      <button className="del-button" onClick={handleDelete}>Delete</button>

      {msg && <p className="del-msg">{msg}</p>}
    </div>
  );
};

export default DeleteId;
