import React, { useState } from 'react';
import '../index.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(username, password);
  };

  const handleSignup = () => {
    console.log("Redirecting to signup page...");
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <label className="input-label">
          <span>Username:</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username...."
          />
        </label>
        <label className="input-label">
          <span>Password:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password..."
          />
        </label>
        <div className="buttons">
          <button type="submit" className="login-button">Login</button>
          <button type="button" onClick={handleSignup} className="signup-button">Sign up</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
