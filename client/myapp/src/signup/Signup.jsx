import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'; 
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); 
    const data = { username, email, password };

    try {
      const result = await axios.post('http://localhost:4500/usersignup', data);
      console.log(result.data); 
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="signup-container" style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h3 className="text-center mb-4">Signup</h3>
      <form onSubmit={handleSignup}>
        <Form.Floating className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="floatingInputCustom">Username</label>
        </Form.Floating>
        <Form.Floating className="mb-3">
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="floatingInputCustom">Email address</label>
        </Form.Floating>
        <Form.Floating className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="floatingPasswordCustom">Password</label>
        </Form.Floating>
        <Button variant="primary" type="submit" className="w-100">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default Signup;
