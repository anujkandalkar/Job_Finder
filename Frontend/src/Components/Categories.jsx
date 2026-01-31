import "./Categories.css";

const categories = [
  { title: "Design & Creative", jobs: 653, icon: "🎨" },
  { title: "Design & Development", jobs: 658, icon: "🖥️" },
  { title: "Sales & Marketing", jobs: 658, icon: "📊" },
  { title: "Mobile Application", jobs: 658, icon: "📱" },
  { title: "Construction", jobs: 658, icon: "👷" },
  { title: "Information Technology", jobs: 658, icon: "💡" },
  { title: "Real Estate", jobs: 658, icon: "🏢" },
  { title: "Content Writer", jobs: 658, icon: "📄" }
];

function Categories() {
  return (
    <section className="categories">
      <p className="subtitle">FEATURED TOURS PACKAGES</p>
      <h2 className="title">Browse Top Categories</h2>

      <div className="category-grid">
        {categories.map((cat, index) => (
          <div className="category-card" key={index}>
            <div className="icon">{cat.icon}</div>
            <h4>{cat.title}</h4>
            <span>({cat.jobs})</span>
          </div>
        ))}
      </div>

      <button className="browse-btn">Browse All Sectors</button>
    </section>
  );
}

export default Categories;
