import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);

  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

axios
  .get("https://careerbydevansh.onrender.com/api/jobs")
  .then((res) => {
    console.log("Jobs API:", res.data);
    setJobs(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

if (role === "student") {
  axios
    .get("https://careerbydevansh.onrender.com/api/applications", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      const appliedIds = res.data.map(
        (app) => app.job?._id
      );

      setAppliedJobs(appliedIds);
    })
    .catch((err) => {
      console.log(err);
    });
}
  }, [navigate]);



  const applyJob = async (jobId) => {
    try {
      const res = await axios.post(
        "https://careerbydevansh.onrender.com/api/applications",
        {
          userId: userId,
          jobId: jobId,
        }
      );

      alert(res.data.message);

      setAppliedJobs([...appliedJobs, jobId]);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(
        `https://careerbydevansh.onrender.com/api/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      setJobs(
        jobs.filter((job) => job._id !== id)
      );

      alert("Job Deleted Successfully");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

const filteredJobs = jobs.filter((job) => {
  const matchesSearch =
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase());

  if (role === "recruiter") {
    return (
      matchesSearch &&
      job.createdBy === userId
    );
  }

  return matchesSearch;
});

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Available Jobs</h2>


      </div>

      <input
        type="text"
        placeholder="Search by title or location..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="search-box"
      />

      <div className="job-container">
        {filteredJobs.map((job) => (
          <div
            className="job-card"
            key={job._id}
          >
            <h3>{job.title}</h3>
            <p><strong>Company:</strong>{job.company}</p>

            <p>
              <strong>Location:</strong>{" "}
              {job.location}
            </p>

            <p>
              <strong>Salary:</strong> ₹
              {job.salary}
            </p>

            <p>{job.description}</p>

            <div className="btn-group">
              {role === "student" && (
                <button
                  className="apply-btn"
                  onClick={() =>
                    applyJob(job._id)
                  }
                  disabled={appliedJobs.includes(
                    job._id
                  )}
                >
                  {appliedJobs.includes(
                    job._id
                  )
                    ? "Applied"
                    : "Apply Now"}
                </button>
              )}

              {role === "recruiter" && (
                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteJob(job._id)
                  }
                >
                  Delete Job
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;