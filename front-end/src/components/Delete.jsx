import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css'; 

const DeleteId = () => {
  const [currencyId, setCurrencyId] = useState('');
  const [msg, setMsg] = useState('');
  const [getIds, setGetIds] = useState([]);

  useEffect(() => {
    fetchGetIds();
  }, []);

  const fetchGetIds = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/currency');
      setGetIds(response.data.map(currency => currency.id));
    } catch (error) {
      console.error('Error fetching currency IDs:', error);
    }
  };

  const handleChange = (event) => {
    setCurrencyId(event.target.value);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/currency/${currencyId}`);
      fetchGetIds();
    } catch (error) {
      setMsg(`Deleted ID: ${currencyId}`);
    }
  };

  return (
    <div className="delete-container">
      <h2>Delete Currency ID</h2>
      <p className="ids">Currency IDs:</p>
      <ul className="ids">
        {getIds.map(id => (
          <li key={id}>{id}</li>
        ))}
      </ul>
      <label className="del-label" htmlFor="currencyId">Enter Currency ID to Delete:</label>
      <input 
         id="currencyId"
         type="text" 
         value={currencyId} onChange={handleChange} />
      <button className="del-button" onClick={handleDelete}>Delete</button>
      {msg && <p className="del-msg">{msg}</p>}
    </div>
  );
};

export default DeleteId;
