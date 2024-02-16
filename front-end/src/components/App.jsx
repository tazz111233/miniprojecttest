import React from 'react';
import '../index.css';
import Login from './Login';
import Conversion from './Conversion';

function App() {
  return (
    <div>
      <h1>Currency-Country</h1>
      <Login />
       <hr />
      <Conversion/>
      <hr />
    </div>
  );
}

export default App; 

