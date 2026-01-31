export default function AdminDashboard() {
  return (
    <div style={{ padding: "30px" }}>
      <h2>Admin Dashboard</h2>

      <p>Welcome Admin 👋</p>

      <a href="/admin/add-job">➕ Add Job</a>
      <br />
      <a href="/admin/jobs">📋 View Jobs</a>
    </div>
  );
}
