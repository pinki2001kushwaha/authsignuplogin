import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../redux/dataSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.data);
  
  // Call useNavigate at the top level
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      dispatch(fetchUserData(token));
    }
  }, [dispatch]);

  // Handle different loading states before rendering the component content
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      // Send request to backend to clear token
      await axios.post("http://localhost:4500/api/logout", {}, { withCredentials: true });
  
      // Remove token from localStorage
      localStorage.removeItem("jwtToken");
  
      // Reset Redux state if required
      dispatch({ type: "RESET_USER_DATA" }); // Assuming you have an action to reset state
  
      // Redirect user to login page after successful logout
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  

  return (
    <div>
      <h1>User Info</h1>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <p>Name: {user.username}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}

      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
