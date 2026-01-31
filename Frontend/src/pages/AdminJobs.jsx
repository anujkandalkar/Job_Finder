import { useEffect, useState } from "react";

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(() => {});
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>All Jobs</h2>

      {jobs.length === 0 && <p>No jobs found</p>}

      {jobs.map(job => (
        <div key={job._id}>
          <h4>{job.title}</h4>
          <p>{job.company}</p>
        </div>
      ))}
    </div>
  );
}
