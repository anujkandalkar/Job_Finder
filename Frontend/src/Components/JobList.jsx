import { useState, useEffect } from "react";
import JobCard from "./JobCard";

function JobList({ filters = {} }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();

    if (filters.search) params.append("search", filters.search);
    if (filters.category) params.append("category", filters.category);
    if (filters.location) params.append("location", filters.location);
    if (filters.type) params.append("type", filters.type);
    if (filters.experience) params.append("experience", filters.experience);

    const url = `http://localhost:5000/api/jobs?${params.toString()}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          setJobs([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setJobs([]);
      })
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className="job-list" style={{ flex: 1 }}>
      <div style={{
        display: "flex",
        justify: "space-between",
        alignItems: "center",
        marginBottom: "16px"
      }}>
        <p className="job-count" style={{ fontWeight: "600", color: "#334155", margin: 0 }}>
          {loading ? "Searching openings..." : `Showing ${jobs.length} Available Jobs`}
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
          ⏳ Loading matching opportunities...
        </div>
      ) : jobs.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {jobs.map((job) => (
            <JobCard key={job._id || job.id} job={job} />
          ))}
        </div>
      ) : (
        <div style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          textAlign: "center",
          color: "#64748b",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
        }}>
          <h3>No jobs found matching your filter criteria</h3>
          <p style={{ fontSize: "0.9rem" }}>Try clearing search keywords or choosing a different job category.</p>
        </div>
      )}
    </div>
  );
}

export default JobList;