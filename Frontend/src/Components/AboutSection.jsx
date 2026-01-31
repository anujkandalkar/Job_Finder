import "./AboutSection.css";
import aboutImg from "../assets/support-img.jpg";

function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-container">
        
        {/* LEFT CONTENT */}
        <div className="about-left">
          <span className="about-tag">WHAT WE ARE DOING</span>

          <h2>
            24k Talented people <br />
            are getting Jobs
          </h2>
          <h3>Connecting Talent With the Right Opportunities</h3>

          <p className="about-desc">
            At Job Finder, we help job seekers discover meaningful career opportunities and connect employers with the right talent. Our platform is designed to make job searching simple, fast, and effective for everyone.
          </p>

          <p className="about-sub">
            Whether you are a fresher starting your career or a professional looking for growth, Job Finder provides access to thousands of verified job listings across multiple industries. Employers can easily post jobs and reach skilled candidates in just a few clicks.
          </p>

          <button className="about-btn">Post A Job</button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="about-right">
          <img src={aboutImg} alt="About" />

          <div className="since-box">
            <span>Since</span>
            <strong>1994</strong>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;
