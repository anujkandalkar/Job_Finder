import { useState } from "react";

function JobFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    location: "",
    type: "",
    experience: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };

  const handleReset = () => {
    const resetState = {
      search: "",
      category: "",
      location: "",
      type: "",
      experience: ""
    };
    setFilters(resetState);
    if (onFilterChange) {
      onFilterChange(resetState);
    }
  };

  return (
    <aside className="job-filter" style={{
      background: "#fff",
      padding: "24px",
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      height: "fit-content"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
        <h3 style={{ margin: 0, fontSize: "1.15rem", color: "#0f172a" }}>🔍 Filter Jobs</h3>
        <button
          onClick={handleReset}
          style={{
            background: "none",
            border: "none",
            color: "#2563eb",
            fontSize: "0.85rem",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Reset All
        </button>
      </div>

      {/* Keyword Search */}
      <div className="filter-group" style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Search Keywords</label>
        <input
          type="text"
          name="search"
          placeholder="e.g. Developer, Designer, React..."
          value={filters.search}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      {/* Category Dropdown */}
      <div className="filter-group" style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Category</label>
        <select name="category" value={filters.category} onChange={handleChange} style={inputStyle}>
          <option value="">All Categories</option>
          <option value="IT">IT & Software</option>
          <option value="Design">Design & Creative</option>
          <option value="Marketing">Marketing & Sales</option>
          <option value="Finance">Finance</option>
          <option value="HR">Human Resources</option>
        </select>
      </div>

      {/* Location Filter */}
      <div className="filter-group" style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Location</label>
        <input
          type="text"
          name="location"
          placeholder="e.g. Remote, New York..."
          value={filters.location}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      {/* Job Type Dropdown */}
      <div className="filter-group" style={{ marginBottom: "16px" }}>
        <label style={labelStyle}>Job Type</label>
        <select name="type" value={filters.type} onChange={handleChange} style={inputStyle}>
          <option value="">All Job Types</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      {/* Experience Level */}
      <div className="filter-group" style={{ marginBottom: "8px" }}>
        <label style={labelStyle}>Experience Level</label>
        <select name="experience" value={filters.experience} onChange={handleChange} style={inputStyle}>
          <option value="">Any Experience</option>
          <option value="Entry Level">Entry Level / Internship</option>
          <option value="1-3">1 - 3 Years</option>
          <option value="3-5">3 - 5 Years</option>
          <option value="5+">5+ Years</option>
        </select>
      </div>
    </aside>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "0.85rem",
  fontWeight: "600",
  color: "#475569",
  marginBottom: "6px"
};

const inputStyle = {
  width: "100%",
  padding: "9px 12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "0.9rem",
  boxSizing: "border-box",
  outline: "none"
};

export default JobFilter;