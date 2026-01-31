import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";

// 1. Import Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddJob from "./pages/AdminAddJob";
import AdminJobs from "./pages/AdminJobs";

function App() {
  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 2. Add Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-job" element={<AdminAddJob />} />
        <Route path="/admin/jobs" element={<AdminJobs />} />
      </Routes>
    </>
  );
}

export default App;