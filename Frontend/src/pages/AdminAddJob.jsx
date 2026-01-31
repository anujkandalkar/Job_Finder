fetch("http://localhost:5000/api/jobs", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  },
  body: JSON.stringify({
    title: "Backend Developer",
    company: "StartupX",
    location: "Remote",
    category: "IT",
    type: "Full-time",
    salary: "8-10 LPA",
    experience: "2+ Years",
    description: "Node.js + MongoDB developer"
  })
});
