import { useState, useEffect } from "react"; // Added hooks
import "./FeaturedJobs.css";

function FeaturedJobs() {
  const [activeJobs, setActiveJobs] = useState([]); // State for dynamic jobs

  useEffect(() => {
    // Fetch logic from your guide (image_b12570.png)
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        // Take only the first 4 jobs for the "Featured" section
        setActiveJobs(data.slice(0, 4)); 
      })
      .catch((err) => console.error("Error fetching featured jobs:", err));
  }, []);

  return (
    <section className="featured-jobs">
      <h2>Featured Jobs</h2>

      {activeJobs.length > 0 ? (
        activeJobs.map((job, index) => (
          <div key={job._id || index} className="job-card">
            <div className="job-left">
              <div className="logo-box">
                {/* Use the logo URL from the database or a default placeholder */}
                <img src={job.logo || "https://via.placeholder.com/50"} alt={job.company} />
              </div>

              <div className="job-info">
                <h4>{job.title}</h4>
                <p>{job.company} - {job.agency || "Direct Hire"}</p>

                <div className="job-meta">
                  <span>📍 {job.location}</span>
                  <span>{job.salary}</span>
                </div>
              </div>
            </div>

            <div className="job-right">
              <span className="job-type">{job.type}</span>
              <div className="job-time">
                {/* Logic to calculate time ago can be added here */}
                {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Just now"}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No featured jobs available right now.</p>
      )}
    </section>
  );
}

export default FeaturedJobs;