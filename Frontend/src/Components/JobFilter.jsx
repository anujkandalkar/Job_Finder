import { useState } from "react";

function JobFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    category: "",
    location: "", // You can add a location input to the UI later
    type: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // For checkboxes, you might want to handle multiple values, 
    // but for this simple fetch, we will take the latest selection.
    const newValue = type === "checkbox" ? (checked ? value : "") : value;
    
    const updatedFilters = { ...filters, [name]: newValue };
    setFilters(updatedFilters);

    // Trigger the fetch logic in the parent component
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };

  return (
    <aside className="job-filter">
      <h3>Filter Jobs</h3>

      <div className="filter-group">
        <label>Job Category</label>
        <select name="category" onChange={handleChange}>
          <option value="">All Categories</option>
          <option value="Marketing">Marketing</option>
          <option value="IT">IT</option>
          <option value="Design">Design</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Job Type</label>
        <div>
          <input 
            type="checkbox" 
            name="type" 
            value="Full Time" 
            onChange={handleChange} 
          /> Full Time
        </div>
        <div>
          <input 
            type="checkbox" 
            name="type" 
            value="Part Time" 
            onChange={handleChange} 
          /> Part Time
        </div>
        <div>
          <input 
            type="checkbox" 
            name="type" 
            value="Remote" 
            onChange={handleChange} 
          /> Remote
        </div>
      </div>

      {/* Experience and Posted Within filters can be added to your 
          backend query logic in a similar fashion */}
    </aside>
  );
}

export default JobFilter;