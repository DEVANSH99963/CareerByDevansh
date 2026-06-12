import { useEffect, useState } from "react";
import axios from "axios";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios
  .get("https://careerbydevansh.onrender.com/api/applications", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  .then((res) => {
    setApplications(res.data);
  })
  .catch((err) => {
    console.log(err);
  });
  }, []);

return (
  <div className="applications-page">
    <h2>My Applications</h2>

    <div className="applications-container">
      {applications
      .filter((app) => app.job)
      .map((app) => (
        <div
          className="application-card"
          key={app._id}
        >
          <h3>{app.job?.title}</h3>

          <p>
            <strong>Location:</strong>{" "}
            {app.job?.location}
          </p>

          <p>
            <strong>Salary:</strong> ₹
            {app.job?.salary}
          </p>

          <span className="status-badge">
            Applied
          </span>
        </div>
      ))}
    </div>
  </div>
);
}

export default MyApplications;