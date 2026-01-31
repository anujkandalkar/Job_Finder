import JobFilter from "../Components/JobFilter";
import JobList from "../Components/JobList";
import Footer from "../Components/Footer";
import "../Components/Job.css";

function Jobs() {
  return (
    <>
      <section className="jobs-page">
        <div className="jobs-container">
          <JobFilter />
          <JobList />
        </div>
      </section>

      {/* Footer OUTSIDE jobs-container */}
      <Footer />
    </>
  );
}

export default Jobs;
