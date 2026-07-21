import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../Components/AdminLayout";

export default function AdminAddJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    category: "IT",
    type: "Full Time",
    salary: "",
    experience: "1-3 Years",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert("🎉 Job posted successfully!");
        navigate("/admin/jobs");
      } else {
        setError(data.message || "Failed to post job");
      }
    } catch (err) {
      console.error("Error creating job:", err);
      setError("Server error. Please ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: "720px", background: "#fff", padding: "32px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <h2 style={{ margin: "0 0 8px 0", color: "#0f172a" }}>➕ Post a New Job Listing</h2>
        <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "24px" }}>
          Fill in the job details below to make it visible to job seekers across the portal.
        </p>

        {error && (
          <div style={{ background: "#fef2f2", color: "#b91c1c", padding: "12px", borderRadius: "8px", marginBottom: "20px", fontSize: "0.9rem" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "18px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Job Title *</label>
              <input
                name="title"
                placeholder="e.g. Senior Frontend Developer"
                value={formData.title}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label style={labelStyle}>Company Name *</label>
              <input
                name="company"
                placeholder="e.g. TechNova Inc."
                value={formData.company}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Location *</label>
              <input
                name="location"
                placeholder="e.g. Remote or San Francisco, CA"
                value={formData.location}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label style={labelStyle}>Category *</label>
              <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
                <option value="IT">IT & Software</option>
                <option value="Design">Design & Creative</option>
                <option value="Marketing">Marketing & Sales</option>
                <option value="Finance">Finance & Accounting</option>
                <option value="HR">Human Resources</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Job Type *</label>
              <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>Salary Range</label>
              <input
                name="salary"
                placeholder="e.g. $80,000 - $100,000"
                value={formData.salary}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Experience Level</label>
              <input
                name="experience"
                placeholder="e.g. 2-4 Years or Entry Level"
                value={formData.experience}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Job Description *</label>
            <textarea
              name="description"
              rows="5"
              placeholder="Describe key responsibilities, qualifications, and benefits..."
              value={formData.description}
              onChange={handleChange}
              style={{ ...inputStyle, fontFamily: "inherit" }}
              required
            />
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "#0284c7",
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "0.95rem",
                cursor: "pointer",
                flex: 1
              }}
            >
              {loading ? "Publishing Job..." : "Publish Job Listing"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/jobs")}
              style={{
                background: "#f1f5f9",
                color: "#475569",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
                fontWeight: "600",
                fontSize: "0.95rem",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "0.85rem",
  fontWeight: "600",
  color: "#334155",
  marginBottom: "6px"
};

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "0.95rem",
  boxSizing: "border-box",
  outline: "none"
};
