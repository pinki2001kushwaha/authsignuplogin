import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Form submit hone se pehle ye prevent karega

    try {
      // Backend ko login details bhejna
      const response = await fetch('http://localhost:4500/userlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('jwtToken', data.token); // Token ko localStorage mein save karenge
        navigate('/home'); // Agar login successful ho gaya toh home page par redirect karenge
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed!');
      }
    } catch (error) {
      // Agar koi error aati hai
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container" style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h3 className="text-center mb-4">Login</h3>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleLogin}>
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
            type="password" // Correct type for password input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="floatingPasswordCustom">Password</label>
        </Form.Floating>
        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
