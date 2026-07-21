import { Link, useLocation, useNavigate } from "react-router-dom";

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/admin", icon: "📊" },
    { label: "Add New Job", path: "/admin/add-job", icon: "➕" },
    { label: "Manage Jobs", path: "/admin/jobs", icon: "📋" }
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <aside style={{
        width: "240px",
        background: "#0f172a",
        color: "#fff",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        justify: "space-between"
      }}>
        <div>
          <div style={{ paddingBottom: "20px", borderBottom: "1px solid #1e293b", marginBottom: "20px" }}>
            <h3 style={{ margin: 0, color: "#38bdf8", fontSize: "1.25rem" }}>⚡ Admin Portal</h3>
            <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Job Finder Control Center</span>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    color: isActive ? "#ffffff" : "#94a3b8",
                    background: isActive ? "#0284c7" : "transparent",
                    fontWeight: isActive ? "600" : "400",
                    textDecoration: "none",
                    transition: "all 0.2s ease"
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "10px",
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, background: "#f8fafc", padding: "32px" }}>
        <header style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px",
          background: "#fff",
          padding: "16px 24px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#0f172a" }}>Employer Dashboard</h2>
            <p style={{ margin: 0, fontSize: "0.875rem", color: "#64748b" }}>Manage job listings and track applications</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{
              background: "#e0f2fe",
              color: "#0369a1",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "0.85rem",
              fontWeight: "600"
            }}>
              Role: Administrator
            </span>
            <Link to="/" style={{ color: "#2563eb", textDecoration: "none", fontSize: "0.9rem", fontWeight: "500" }}>
              🌐 View Main Site
            </Link>
          </div>
        </header>

        <div>{children}</div>
      </main>
    </div>
  );
}
