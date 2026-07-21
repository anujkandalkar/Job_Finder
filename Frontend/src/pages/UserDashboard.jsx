import { useEffect, useState } from "react";
// 1. Logic from image_778fe7.png: Import jwt-decode to read user data from token
import { jwtDecode } from "jwt-decode"; 

export default function UserDashboard() {
  const [apps, setApps] = useState([]);
  
  // 2. Logic from image_778fe7.png: Extract user profile from the stored JWT
  const token = localStorage.getItem("token");
  let user = null;
  
  if (token) {
    try {
      user = jwtDecode(token);
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  useEffect(() => {
    // 3. Logic from image_778fe7.png: Fetch applications from the specific protected endpoint
    fetch("http://localhost:5000/api/apply/my", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setApps(data);
        }
      })
      .catch(err => console.error("Error fetching applications:", err));
  }, [token]);

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      {/* 4. Display Profile Info from JWT as shown in image_778fe7.png */}
      <section style={{ marginBottom: "40px", borderBottom: "1px solid #ddd", paddingBottom: "20px" }}>
        <h3>My Profile</h3>
        {user ? (
          <>
            <p><strong>User ID:</strong> {user.id}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </>
        ) : (
          <p>Please log in to view profile details.</p>
        )}
      </section>

      {/* 5. Display Applications from Database */}
      <section>
        <h2>My Applications</h2>
        {apps.length === 0 ? (
          <p>No applications yet. Start applying to jobs!</p>
        ) : (
          apps.map(a => (
            <div key={a._id} style={{ 
              background: "#fff", 
              padding: "15px", 
              margin: "15px 0", 
              borderRadius: "8px", 
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)" 
            }}>
              {/* Ensure you access nested jobId data properly */}
              <h4>{a.jobId?.title || "Job Title"}</h4>
              <p style={{ color: "#666" }}>{a.jobId?.company || "Company Name"}</p>
              <p>Status: <span style={{ fontWeight: "bold" }}>{a.status || "Pending"}</span></p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}