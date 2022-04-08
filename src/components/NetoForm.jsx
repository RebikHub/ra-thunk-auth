import React from 'react';

export default function NetoForm({
  login,
  password,
  handleInputLogin,
  handleInputPassword,
  handleClickIn
}) {

  return (
    <form className="form">
      <input 
        type="text"
        className="input-name"
        placeholder="Username"
        required
        value={login}
        onChange={handleInputLogin}/>
      <input
        type="password"
        className="input-password"
        placeholder="Password"
        required
        value={password}
        onChange={handleInputPassword}/>
      <button
        className="form-btn"
        onClick={handleClickIn}>Login</button>
    </form>
  );
};
