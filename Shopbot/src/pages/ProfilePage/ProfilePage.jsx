import React, { useEffect, useState } from "react";
import API from "../../services/shopbot-api";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/my-profile");
        setProfile(data);
      } catch (error) {
        alert("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h1>My Profile</h1>
      {profile ? (
        <div>
          <p>
            Name: {profile.fName} {profile.lName}
          </p>
          <p>Email: {profile.email}</p>
          <p>Role: {profile.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
