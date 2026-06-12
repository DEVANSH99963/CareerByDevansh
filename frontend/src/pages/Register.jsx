import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://careerbydevansh.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      alert(res.data.message);
      window.location.href = "/login";

      setName("");
      setEmail("");
      setPassword("");
      setRole("student");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

return (
  <div className="register-container">
    <div className="register-card">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  </div>
);
}

export default Register;