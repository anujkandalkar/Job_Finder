import "./Testimonial.css";
import personImg from "../assets/testimonial-founder.png";

function Testimonial() {
  return (
    <section className="testimonial">
      <div className="testimonial-card">
        <div className="profile-wrapper">
          <img src={personImg} alt="Margaret Lawson" />
          <span className="quote-icon">❝</span>
        </div>

        <h4>Margaret Lawson</h4>
        <span className="designation">Creative Director</span>

        <p className="testimonial-text">
          “I am at an age where I just want to be fit and healthy our bodies are
          our responsibility! So start caring for your body and it will care
          for you. Eat clean it will care for you and workout hard.”
        </p>

        <div className="dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
