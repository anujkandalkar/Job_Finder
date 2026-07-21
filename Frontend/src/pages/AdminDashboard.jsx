import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../Components/AdminLayout";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalUsers: 0,
    totalApplications: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/jobs/stats", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
          setRecentJobs(data.recentJobs || []);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      {/* Metric Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        <MetricCard
          title="Total Active Jobs"
          value={loading ? "..." : stats.totalJobs}
          icon="💼"
          color="#3b82f6"
          bg="#eff6ff"
        />
        <MetricCard
          title="Job Seekers Registered"
          value={loading ? "..." : stats.totalUsers}
          icon="👥"
          color="#10b981"
          bg="#ecfdf5"
        />
        <MetricCard
          title="Applications Received"
          value={loading ? "..." : stats.totalApplications}
          icon="📄"
          color="#8b5cf6"
          bg="#f5f3ff"
        />
      </div>

      {/* Quick Action Banner */}
      <div style={{
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        color: "#fff",
        padding: "24px",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px"
      }}>
        <div>
          <h3 style={{ margin: "0 0 6px 0", fontSize: "1.2rem" }}>Need to publish a new job opening?</h3>
          <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.9rem" }}>Create job listings with detailed requirements and start receiving applicants immediately.</p>
        </div>
        <Link
          to="/admin/add-job"
          style={{
            background: "#0284c7",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "0.95rem"
          }}
        >
          ➕ Post New Job
        </Link>
      </div>

      {/* Recent Job Postings Table */}
      <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ margin: 0, fontSize: "1.1rem", color: "#0f172a" }}>Recent Job Postings</h3>
          <Link to="/admin/jobs" style={{ color: "#2563eb", textDecoration: "none", fontSize: "0.9rem", fontWeight: "600" }}>
            View All ({stats.totalJobs}) →
          </Link>
        </div>

        {recentJobs.length === 0 ? (
          <p style={{ color: "#64748b", fontStyle: "italic" }}>No job listings created yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f1f5f9", color: "#64748b", fontSize: "0.85rem", textTransform: "uppercase" }}>
                <th style={{ padding: "12px 8px" }}>Job Title</th>
                <th style={{ padding: "12px 8px" }}>Company</th>
                <th style={{ padding: "12px 8px" }}>Location</th>
                <th style={{ padding: "12px 8px" }}>Category</th>
                <th style={{ padding: "12px 8px" }}>Type</th>
              </tr>
            </thead>
            <tbody>
              {recentJobs.map((job) => (
                <tr key={job._id} style={{ borderBottom: "1px solid #f1f5f9", fontSize: "0.95rem" }}>
                  <td style={{ padding: "12px 8px", fontWeight: "600", color: "#0f172a" }}>{job.title}</td>
                  <td style={{ padding: "12px 8px", color: "#475569" }}>{job.company}</td>
                  <td style={{ padding: "12px 8px", color: "#475569" }}>{job.location}</td>
                  <td style={{ padding: "12px 8px" }}>
                    <span style={{ background: "#e2e8f0", color: "#334155", padding: "4px 8px", borderRadius: "6px", fontSize: "0.8rem" }}>
                      {job.category}
                    </span>
                  </td>
                  <td style={{ padding: "12px 8px" }}>
                    <span style={{ background: "#dbeafe", color: "#1e40af", padding: "4px 8px", borderRadius: "6px", fontSize: "0.8rem" }}>
                      {job.type}
                    </span>
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

function MetricCard({ title, value, icon, color, bg }) {
  return (
    <div style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      borderLeft: `4px solid ${color}`
    }}>
      <div style={{
        background: bg,
        width: "48px",
        height: "48px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem"
      }}>
        {icon}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b", fontWeight: "500" }}>{title}</p>
        <h3 style={{ margin: "4px 0 0 0", fontSize: "1.6rem", color: "#0f172a" }}>{value}</h3>
      </div>
    </div>
  );
}
