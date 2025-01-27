import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./login/Login";
import Signup from "./signup/Signup";
import Home from "./home/Home";
import ProtectedRoute from "../src/ProtectRoute/ProtectRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected route ko wrap kar rahe hain */}
        <Route
          path="/home"
          element={<ProtectedRoute element={Home} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
