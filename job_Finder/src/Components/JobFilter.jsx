function JobFilter() {
  return (
    <aside className="job-filter">
      <h3>Filter Jobs</h3>

      <div className="filter-group">
        <label>Job Category</label>
        <select>
          <option>All Categories</option>
          <option>Marketing</option>
          <option>IT</option>
          <option>Design</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Job Type</label>
        <div><input type="checkbox" /> Full Time</div>
        <div><input type="checkbox" /> Part Time</div>
        <div><input type="checkbox" /> Remote</div>
      </div>

      <div className="filter-group">
        <label>Experience</label>
        <div><input type="checkbox" /> 1–2 Years</div>
        <div><input type="checkbox" /> 3–5 Years</div>
      </div>

      <div className="filter-group">
        <label>Posted Within</label>
        <div><input type="checkbox" /> Today</div>
        <div><input type="checkbox" /> Last 7 Days</div>
      </div>
    </aside>
  );
}

export default JobFilter;
