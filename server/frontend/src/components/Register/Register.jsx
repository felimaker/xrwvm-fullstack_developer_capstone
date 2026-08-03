import React, { useState } from 'react';


const Register = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const registerUser = async (e) => {
    e.preventDefault();
    // Lógica de registro para el backend de Django
    console.log("Registrando usuario:", userName);
  };

  return (
    <div className="register_container">
      <form onSubmit={registerUser}>
        <h2>Register</h2>
        
        <input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;