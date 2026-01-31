import "./HowItWorks.css";

const steps = [
  {
    title: "Search a job",
    icon: "🔍",
    desc:
      "Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut labore."
  },
  {
    title: "Apply for job",
    icon: "📝",
    desc:
      "Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut labore."
  },
  {
    title: "Get your job",
    icon: "👤",
    desc:
      "Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut labore."
  }
];

function HowItWorks() {
  return (
    <section className="how-it-works">
      <p className="process-subtitle">APPLY PROCESS</p>
      <h2 className="process-title">How it works</h2>

      <div className="process-cards">
        {steps.map((step, index) => (
          <div className="process-card" key={index}>
            <div className="process-icon">{step.icon}</div>
            <h4>
              {index + 1}. {step.title}
            </h4>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
