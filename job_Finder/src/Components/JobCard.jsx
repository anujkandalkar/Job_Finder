import ziggo from "../assets/job1.png";

function JobCard() {
  return (
    <div className="job-card">
      <img src={ziggo} alt="company" />

      <div className="job-info">
        <h4>Digital Marketer</h4>
        <p>Creative Agency • Athens, Greece</p>
        <span>$3500 - $4000</span>
      </div>

      <div className="job-meta">
        <span className="job-type">Full Time</span>
        <p>7 hours ago</p>
      </div>
    </div>
  );
}

export default JobCard;
