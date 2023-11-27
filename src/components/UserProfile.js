import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "./layout/MetaData";
import { Link } from "react-router-dom";
import "./UserProfile.css";

const Profile = () => {
  return (
        <Fragment>
          <MetaData title={`${localStorage.getItem("userName")}'s Profile`} />
          <div className="profileContainer">
            <div>
              <img src="2.jpg" alt={localStorage.getItem("userName")} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{localStorage.getItem("userName")}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{localStorage.getItem("userEmail")}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>10jan</p>
              </div>

              <div>
                <Link to="/orderpage">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
  );
};

export default Profile;