import "./FeaturedJobs.css";

import ziggoLogo from "../assets/job1.png";
import elisaLogo from "../assets/job2.png";
import rostelecomLogo from "../assets/job3.png";
import veoliaLogo from "../assets/job4.png";

const jobs = [
  {
    company: "Ziggo",
    title: "Digital Marketer",
    agency: "Creative Agency",
    location: "Athens, Greece",
    salary: "$3500 - $4000",
    type: "Full Time",
    time: "7 hours ago",
    logo: ziggoLogo
  },
  {
    company: "Elisa",
    title: "Digital Marketer",
    agency: "Creative Agency",
    location: "Athens, Greece",
    salary: "$3500 - $4000",
    type: "Full Time",
    time: "7 hours ago",
    logo: elisaLogo
  },
  {
    company: "Rostelecom",
    title: "Digital Marketer",
    agency: "Creative Agency",
    location: "Athens, Greece",
    salary: "$3500 - $4000",
    type: "Full Time",
    time: "7 hours ago",
    logo: rostelecomLogo
  },
  {
    company: "Veolia",
    title: "Digital Marketer",
    agency: "Creative Agency",
    location: "Athens, Greece",
    salary: "$3500 - $4000",
    type: "Full Time",
    time: "7 hours ago",
    logo: veoliaLogo
  }
];

function FeaturedJobs() {
  return (
    <section className="featured-jobs">
      <h2>Featured Jobs</h2>

      {jobs.map((job, index) => (
        <div className="job-card">
  <div className="job-left">
    <div className="logo-box">
      <img src={job.logo} alt={job.company} />
    </div>

    <div className="job-info">
      <h4>{job.title}</h4>
      <p>{job.agency}</p>

      <div className="job-meta">
        <span>📍 {job.location}</span>
        <span>{job.salary}</span>
      </div>
    </div>
  </div>

  <div className="job-right">
    <span className="job-type">{job.type}</span>
    <div className="job-time">{job.time}</div>
  </div>
</div>

      ))}
    </section>
  );
}

export default FeaturedJobs;
