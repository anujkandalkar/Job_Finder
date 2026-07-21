import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../Components/AdminLayout";

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchJobs = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setJobs(data);
        }
      })
      .catch((err) => console.error("Error fetching jobs:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("🗑️ Job deleted successfully!");
        setJobs(jobs.filter((j) => j._id !== id));
      } else {
        alert(data.message || "Failed to delete job.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Server error while deleting job.");
    }
  };

  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h2 style={{ margin: 0, color: "#0f172a", fontSize: "1.3rem" }}>Manage Job Listings ({jobs.length})</h2>
            <p style={{ margin: 0, color: "#64748b", fontSize: "0.875rem" }}>Search, view, and remove job postings</p>
          </div>
          <Link
            to="/admin/add-job"
            style={{
              background: "#0284c7",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "0.9rem"
            }}
          >
            ➕ Post New Job
          </Link>
        </div>

        {/* Search filter input */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="🔍 Search jobs by title, company or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "0.95rem",
              boxSizing: "border-box"
            }}
          />
        </div>

        {loading ? (
          <p style={{ color: "#64748b" }}>Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p style={{ color: "#64748b", fontStyle: "italic", textAlign: "center", padding: "20px" }}>
            No matching job listings found.
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f1f5f9", color: "#64748b", fontSize: "0.85rem", textTransform: "uppercase" }}>
                <th style={{ padding: "12px" }}>Title & Company</th>
                <th style={{ padding: "12px" }}>Location</th>
                <th style={{ padding: "12px" }}>Category</th>
                <th style={{ padding: "12px" }}>Salary</th>
                <th style={{ padding: "12px" }}>Type</th>
                <th style={{ padding: "12px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px" }}>
                    <div style={{ fontWeight: "600", color: "#0f172a" }}>{job.title}</div>
                    <div style={{ fontSize: "0.85rem", color: "#64748b" }}>{job.company}</div>
                  </td>
                  <td style={{ padding: "12px", color: "#475569", fontSize: "0.9rem" }}>{job.location}</td>
                  <td style={{ padding: "12px" }}>
                    <span style={{ background: "#f1f5f9", color: "#334155", padding: "4px 10px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: "500" }}>
                      {job.category}
                    </span>
                  </td>
                  <td style={{ padding: "12px", color: "#059669", fontSize: "0.9rem", fontWeight: "600" }}>
                    {job.salary || "N/A"}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span style={{ background: "#dbeafe", color: "#1e40af", padding: "4px 10px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: "500" }}>
                      {job.type}
                    </span>
                  </td>
                  <td style={{ padding: "12px", textAlign: "right" }}>
                    <button
                      onClick={() => handleDelete(job._id, job.title)}
                      style={{
                        background: "#fee2e2",
                        color: "#dc2626",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontWeight: "600",
                        fontSize: "0.85rem",
                        cursor: "pointer"
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
