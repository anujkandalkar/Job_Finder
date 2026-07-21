import { useState } from "react";
import JobFilter from "../Components/JobFilter";
import JobList from "../Components/JobList";
import Footer from "../Components/Footer";
import "../Components/Job.css";

function Jobs() {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <section className="jobs-page" style={{ padding: "40px 20px", background: "#f8fafc", minHeight: "80vh" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto 24px" }}>
          <h2 style={{ fontSize: "1.8rem", color: "#0f172a", margin: "0 0 6px 0" }}>Explore Opportunities</h2>
          <p style={{ color: "#64748b", margin: 0 }}>Find and apply to top roles in IT, Design, Marketing, and more.</p>
        </div>

        <div className="jobs-container" style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "28px"
        }}>
          <JobFilter onFilterChange={handleFilterChange} />
          <JobList filters={filters} />
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Jobs;
