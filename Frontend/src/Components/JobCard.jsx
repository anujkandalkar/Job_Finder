import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
  const navigate = useNavigate();

  // Logic to apply for a job using the backend API
  const applyJob = async (id) => {
    const token = localStorage.getItem("token"); // Retrieve auth token

    // If no token, redirect to login
    if (!token) {
      alert("Please login to apply for this job!");
      return navigate("/login");
    }

    try {
      const res = await fetch(`http://localhost:5000/api/apply/${id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`, // Authorized request
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      alert(data.message); // Show success or error message
    } catch (error) {
      console.error("Application error:", error);
      alert("Failed to submit application.");
    }
  };

  return (
    <div className="job-card">
      <img src={job?.logo || "https://via.placeholder.com/50"} alt="company" />

      <div className="job-info">
        <h4>{job?.title || "Digital Marketer"}</h4>
        <p>{job?.company || "Creative Agency"} • {job?.location || "Remote"}</p>
        <span>{job?.salary || "$3500 - $4000"}</span>
      </div>

      <div className="job-meta">
        <span className="job-type">{job?.type || "Full Time"}</span>
        <button 
          className="apply-btn" 
          onClick={() => applyJob(job._id)} // Trigger apply logic
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default JobCard;