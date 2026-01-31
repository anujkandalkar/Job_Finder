import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      
      <div className="logo">
        <h2>Job Finder</h2>
        <span>Get your dream job</span>
      </div>

      {/* NAV LINKS */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li>
          <Link to="/jobs" onClick={() => setMenuOpen(false)}>Find Jobs</Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        </li>
        <li>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </li>

        <div className="nav-buttons">
          <Link to="/register" className="btn" onClick={() => setMenuOpen(false)}>
            Register
          </Link>
          <Link to="/login" className="btn-outline" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
        </div>
      </ul>

      {/* HAMBURGER ICON */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

    </nav>
  );
}

export default Navbar;
