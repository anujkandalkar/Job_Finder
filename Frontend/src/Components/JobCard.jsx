import { useState } from "react";
import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
  const navigate = useNavigate();
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const applyJob = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("🔒 Please log in as a Job Seeker to apply for this position!");
      return navigate("/login");
    }

    setApplying(true);

    try {
      const res = await fetch(`http://localhost:5000/api/apply/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      if (res.ok) {
        setApplied(true);
        alert("✅ Application submitted successfully! View status on your Dashboard.");
      } else {
        alert(data.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Application error:", error);
      alert("Server error. Please try again later.");
    } finally {
      setApplying(false);
    }
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case "IT": return { bg: "#e0f2fe", text: "#0369a1" };
      case "Design": return { bg: "#fce7f3", text: "#be185d" };
      case "Marketing": return { bg: "#fef3c7", text: "#b45309" };
      case "Finance": return { bg: "#dcfce7", text: "#15803d" };
      default: return { bg: "#f1f5f9", text: "#475569" };
    }
  };

  const categoryStyle = getCategoryColor(job?.category);

  return (
    <div style={{
      background: "#fff",
      padding: "20px 24px",
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "20px",
      transition: "transform 0.15s ease, boxShadow 0.15s ease",
      border: "1px solid #f1f5f9"
    }}>
      {/* Left Column: Company Avatar & Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{
          width: "52px",
          height: "52px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#38bdf8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.25rem",
          fontWeight: "700"
        }}>
          {job?.company ? job.company.charAt(0).toUpperCase() : "💼"}
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <h4 style={{ margin: 0, fontSize: "1.1rem", color: "#0f172a", fontWeight: "600" }}>
              {job?.title || "Job Position"}
            </h4>
            <span style={{
              background: categoryStyle.bg,
              color: categoryStyle.text,
              fontSize: "0.75rem",
              fontWeight: "600",
              padding: "2px 8px",
              borderRadius: "12px"
            }}>
              {job?.category || "General"}
            </span>
          </div>

          <p style={{ margin: 0, fontSize: "0.875rem", color: "#64748b" }}>
            🏢 <strong style={{ color: "#334155" }}>{job?.company || "Company"}</strong> • 📍 {job?.location || "Remote"} • ⏳ {job?.experience || "Any Experience"}
          </p>

          <p style={{ margin: "6px 0 0 0", fontSize: "0.85rem", color: "#475569", lineClamp: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {job?.description}
          </p>
        </div>
      </div>

      {/* Right Column: Salary & Apply CTA */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px", minWidth: "160px" }}>
        <span style={{ fontSize: "1.05rem", fontWeight: "700", color: "#059669" }}>
          {job?.salary || "Negotiable"}
        </span>

        <span style={{
          background: "#dbeafe",
          color: "#1e40af",
          fontSize: "0.8rem",
          fontWeight: "600",
          padding: "4px 10px",
          borderRadius: "6px"
        }}>
          {job?.type || "Full Time"}
        </span>

        <button
          onClick={() => applyJob(job._id)}
          disabled={applying || applied}
          style={{
            background: applied ? "#10b981" : "#0284c7",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "0.9rem",
            cursor: applied ? "default" : "pointer",
            width: "100%",
            transition: "all 0.2s ease"
          }}
        >
          {applying ? "Applying..." : applied ? "✓ Applied" : "Apply Now"}
        </button>
      </div>
    </div>
  );
}

export default JobCard;