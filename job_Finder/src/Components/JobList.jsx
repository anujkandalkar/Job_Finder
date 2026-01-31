import JobCard from "./JobCard";

function JobList() {
  return (
    <div className="job-list">
      <p className="job-count">39,782 Jobs Found</p>

      <JobCard />
      <JobCard />
      <JobCard />

      <div className="pagination">
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
      </div>
    </div>
  );
}

export default JobList;
