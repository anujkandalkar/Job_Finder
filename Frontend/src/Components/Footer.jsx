import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">

        {/* ABOUT */}
        <div className="footer-col">
          <h4>ABOUT US</h4>
          <p>
            Job Finder is a modern job portal helping talented people connect with top companies worldwide. 
            We make job searching simple, fast, and effective for both employers and job seekers.
          </p>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h4>CONTACT INFO</h4>
          <p>Address : Pune</p>
          <p>Phone : +91 </p>
          <p>Email : admin@gmail.com</p>
        </div>

        {/* LINKS */}
        <div className="footer-col">
          <h4>IMPORTANT LINK</h4>
          <ul>
            <li>View Project</li>
            <li>Contact Us</li>
            <li>Testimonial</li>
            <li>Proparties</li>
            <li>Support</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-col">
          <h4>NEWSLETTER</h4>
          <p>
           Subscribe to get the latest job updates, career tips, and hiring news delivered to your inbox.
          </p>

          <div className="newsletter">
            <input type="email" placeholder="Email Address" />
            <button>➤</button>
          </div>
        </div>

      </div>

      <hr />

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p >
          Copyright ©2026 All rights reserved !!
        </p>

        
      </div>
    </footer>
  );
}

export default Footer;
