import React from 'react';
import '../index.css';
import Login from './Login';
import Conversion from './Conversion';
import AddCurrency from './AddCurrency';
import UpdateCurrency from './UpdateCurrency';
import Delete  from './Delete';
function App() {
  return (
    <div>
      <h1>Currency-Country</h1>
      <Login />
      <hr />
      <Conversion />
      <hr />
      <AddCurrency />
      <hr />
      <UpdateCurrency />
      <hr />
      <Delete/> 
      <hr />
    </div>
  );
}

export default App;
