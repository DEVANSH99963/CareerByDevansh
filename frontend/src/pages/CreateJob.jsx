import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateJob() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post(
      "http://localhost:5000/api/jobs",
      {
        title,
        company,
        location,
        salary,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
        },
      }
    );

    alert("Job Created Successfully");
    navigate("/dashboard");
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
      "Error Creating Job"
    );
  }
};
return (
  <div className="create-job-container">
    <div className="create-job-card">
      <h2>Create Job</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        />

        <button type="submit">
          Create Job
        </button>
      </form>
    </div>
  </div>
);
}

export default CreateJob;