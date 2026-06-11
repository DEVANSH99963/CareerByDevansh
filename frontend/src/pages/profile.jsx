import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    setUser(storedUser);
  }, []);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-card">
        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Role:</strong> {""}
          {user.role === "student"
          ?"Student"
        :"Recruiter"}
        </p>
      </div>
    </div>
  );
}

export default Profile;