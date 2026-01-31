import Footer from "../Components/Footer";
import "./Contact.css";

function Contact() {
  return (
    <>
    <section className="contact-section">
      <div className="contact-container">

        {/* LEFT */}
        <div className="contact-left">
          <span className="contact-tag">CONTACT US</span>
          <h2>We’d love to hear from you</h2>
          <p>
            Have a question about jobs, hiring, or partnerships?
            Fill out the form and our team will get back to you shortly.
          </p>

          <div className="contact-info">
            <p><strong>Email:</strong> support@jobfinder.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Location:</strong> Pune, India</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="contact-right">
          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

      </div>
    </section>
    <Footer/>
    </>
  );
}

export default Contact;
