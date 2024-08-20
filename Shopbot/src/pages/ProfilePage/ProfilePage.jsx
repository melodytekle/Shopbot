import React, { useEffect, useState } from "react";
import API from "../../services/shopbot-api";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You are not logged in. Please log in again.");
          navigate("/login");
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
          localStorage.removeItem("token");
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
        <h3>YOUR ORDERS</h3>
        <div className="order__summary">
          <ul className="order__list">
            {profile.orders.map((order) => (
              <div className="order__details">
                <li key={order.trackingNumber}>
                  <p>
                    <strong>Tracking Number:</strong> {order.trackingNumber}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>
                  <p>
                    <strong>Estimated Delivery:</strong>{" "}
                    {order.estimatedDelivery}
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
              </div>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="profile__summary">
      <section className="profile__list">
        <h1>My Profile</h1>
        {profile ? (
          <div className="profile__details">
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
        <button className="return-button" onClick={() => navigate("/")}>
          Return to HomePage
        </button>
      </section>
    </div>
  );
};

export default ProfilePage;
