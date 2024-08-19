import React, { useEffect, useState } from "react";
import API from "../../services/shopbot-api";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You are not logged in. Please log in again.");
          navigate("/login"); // Redirect to login page if token is missing
          return;
        }

        const { data } = await API.get("/my-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        if (error.response && error.response.status === 401) {
          alert("Your session has expired. Please log in again.");
          localStorage.removeItem("token"); // Clear the token if it's invalid or expired
          navigate("/login");
        } else {
          alert("Failed to fetch profile. Please try again later.");
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const renderOrders = () => {
    if (!profile?.orders) {
      return (
        <p>
          You have not made any orders yet, <a href="/">start shopping now!</a>
        </p>
      );
    }

    return (
      <div>
        <h3>Your Orders:</h3>
        <ul>
          {profile.orders.map((order) => (
            <li key={order.trackingNumber}>
              <p>
                <strong>Tracking Number:</strong> {order.trackingNumber}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Estimated Delivery:</strong> {order.estimatedDelivery}
              </p>
              <p>
                <strong>Items:</strong>
              </p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.quantity} x {item.name} (${item.price})
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  };

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
          {renderOrders()}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={() => navigate("/")}>Return to HomePage</button>
    </div>
  );
};

export default ProfilePage;
