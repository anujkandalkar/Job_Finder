import { useState, useEffect } from "react";
import JobCard from "./JobCard";

function JobList() {
  const [jobs, setJobs] = useState([]); // State to hold fetched jobs

  // Fetch jobs from backend when component mounts
  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data)) // Assuming data is an array of jobs
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  return (
    <div className="job-list">
      <p className="job-count">{jobs.length} Jobs Found</p>

      {/* Map through the jobs array to render JobCard dynamically */}
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <JobCard key={job._id || job.id} job={job} />
        ))
      ) : (
        <p>No jobs found. Start the backend to see real data!</p>
      )}

      <div className="pagination">
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
      </div>
    </div>
  );
}

export default JobList;