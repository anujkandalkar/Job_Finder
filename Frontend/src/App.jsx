import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Install via: npm install jwt-decode
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddJob from "./pages/AdminAddJob";
import AdminJobs from "./pages/AdminJobs";

// User Pages
import UserDashboard from "./pages/UserDashboard"; 

// 1. Protection Component Logic
const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  
  if (!token) return <Navigate to="/login" />;

  try {
    const decoded = jwtDecode(token);
    // If role doesn't match, redirect to their correct home
    if (decoded.role !== allowedRole) {
      return <Navigate to={decoded.role === "admin" ? "/admin" : "/dashboard"} />;
    }
    return children;
  } catch (error) {
    return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 2. Admin Routes (Protected) */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/add-job" element={
          <ProtectedRoute allowedRole="admin">
            <AdminAddJob />
          </ProtectedRoute>
        } />
        <Route path="/admin/jobs" element={
          <ProtectedRoute allowedRole="admin">
            <AdminJobs />
          </ProtectedRoute>
        } />
        
        {/* 3. User Route (Protected) */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRole="user">
            <UserDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;