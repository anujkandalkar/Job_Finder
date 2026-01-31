import { useState } from "react";

export default function AdminAddJob() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    type: "",
    salary: "",
    experience: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      alert(data.message || "Job added");
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Add Job</h2>

      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            value={formData[key]}
            onChange={handleChange}
            style={{ display: "block", margin: "8px 0" }}
            required
          />
        ))}

        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}
