// // UserProfile.js

// import React, { useState } from 'react';
// import './UserProfile.css';
// import Avatar from '@mui/material/Avatar';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import { NavLink } from 'react-router-dom';

// const UserProfile = () => {
//   // State to manage the editing of the name
//   const [isEditingName, setIsEditingName] = useState(true);
//   const [editedName, setEditedName] = useState(localStorage.getItem('userName') || '');

//   // State to manage the editing of the email
//   const [isEditingEmail, setIsEditingEmail] = useState(true);
//   const [editedEmail, setEditedEmail] = useState(localStorage.getItem('userEmail') || '');

//   // State to manage the editing of the mobile number
//   const [isEditingMobile, setIsEditingMobile] = useState(true);
//   const [editedMobile, setEditedMobile] = useState(localStorage.getItem('userMobile') || '');

//   // State for profile picture
//   const [profilePicture, setProfilePicture] = useState(localStorage.getItem('profilePicture') || '');

//   // Function to handle the name edit submission
//   const handleNameEditSubmit = (e) => {
//     e.preventDefault();
//     // Save the edited name to localStorage or your backend
//     localStorage.setItem('userName', editedName);
//     setIsEditingName(false);
//   };

//   // Function to handle the email edit submission
//   const handleEmailEditSubmit = (e) => {
//     e.preventDefault();
//     // Save the edited email to localStorage or your backend
//     localStorage.setItem('userEmail', editedEmail);
//     setIsEditingEmail(false);
//   };

//   // Function to handle the mobile number edit submission
//   const handleMobileEditSubmit = (e) => {
//     e.preventDefault();
//     // Save the edited mobile number to localStorage or your backend
//     localStorage.setItem('userMobile', editedMobile);
//     setIsEditingMobile(false);
//   };

//   // Function to handle profile picture upload
//   const handleProfilePictureUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // You can upload the file to your backend and save the URL to localStorage
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePicture(reader.result);
//         localStorage.setItem('profilePicture', reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Grid container spacing={3} className="user-profile-container">
//       <Grid item xs={3}>
//         <div className="avatar-container">
//           <label htmlFor="profile-picture-upload">
//             <Avatar alt="User Avatar" src={profilePicture} sx={{ width: 80, height: 80, cursor: 'pointer' }} />
//             <input
//               type="file"
//               accept="image/*"
//               id="profile-picture-upload"
//               style={{ display: 'none' }}
//               onChange={handleProfilePictureUpload}
//             />
//           </label>
//           <Typography variant="h6" mt={1}>
//             Hello, {localStorage.getItem('userName')}
//           </Typography>
//           <div className="faqs">
//             <h3>FAQ's</h3>
//             <h4>What happens when I update my email address (or mobile number)?</h4>
//             <p>Your login email id (or mobile number) changes, likewise. </p>
//             <h4>When will my account be updated with the new email address (or mobile number)?</h4>
//             <p>It happens as soon as you confirm the verification code sent to your email</p>
//             <h4>What happens to my existing account when I update my email address (or mobile number)?</h4>
//             <p>Updating your email address (or mobile number) doesn't invalidate your account.</p>
//             <h4>Does my Seller account get affected when I update my email address?</h4>
//             <p>you have a 'single sign-on' policy. </p>
//           </div>
//         </div>
//       </Grid>
//       <Grid item xs={9}>
//         <div className="profile-menu">
//         <NavLink to="/orderpage" >
//             <button  color="primary">My Profile</button>
//           </NavLink>          
//           <a href="/account">ACCOUNT SETTINGS</a>
//           <a href="/account/giftcard">PAYMENTS</a>
//           <a href="/account/rewards">MY STUFF</a>
//           <span className="logout">Logout</span>
//         </div>
//         <div className="profile-content">
//           <div className="personal-info">
//             <Typography variant="h5" mb={2}>
//               Personal Information
//             </Typography>
//             <Button onClick={() => setIsEditingName(true)} variant="outlined">
//               Edit
//             </Button>
//             {/* Display Name with Edit Option */}
//             {isEditingName ? (
//               <form onSubmit={handleNameEditSubmit} >
//                 <TextField
//                   id="editedName"
//                   label="Name"
//                   variant="outlined"
//                   fullWidth
//                   value={editedName}
//                   onChange={(e) => setEditedName(e.target.value)}
//                   style={{marginTop:"10px"}}
//                 />
//                 <Button type="submit" variant="contained" color="primary" mt={2} style={{marginTop:"10px"}}>
//                   Save
//                 </Button>
//               </form>
//             ) : (
//               <Typography variant="h6" mt={2}>
//                 {localStorage.getItem('userName')}
//               </Typography>
//             )}
//           </div>
//           {/* Add similar sections for Email and Mobile Number */}
//           <div className="personal-info">
//             <Typography variant="h5" mb={2}>
//               Email Address
//             </Typography>
//             <Button onClick={() => setIsEditingEmail(true)} variant="outlined">
//               Edit
//             </Button>
//             {isEditingEmail ? (
//               <form onSubmit={handleEmailEditSubmit}>
//                 <TextField
//                   id="editedEmail"
//                   label="Email Address"
//                   variant="outlined"
//                   fullWidth
//                   value={editedEmail}
//                   onChange={(e) => setEditedEmail(e.target.value)}
//                   style={{marginTop:"10px"}}
//                 />
//                 <Button type="submit" variant="contained" color="primary" mt={2} style={{marginTop:"10px"}}>
//                   Save
//                 </Button>
//               </form>
//             ) : (
//               <Typography variant="h6" mt={2}>
//                 {localStorage.getItem('userEmail')}
//               </Typography>
//             )}
//           </div>
//           <div className="personal-info">
//             <Typography variant="h5" mb={2}>
//               Mobile Number
//             </Typography>
//             <Button onClick={() => setIsEditingMobile(true)} variant="outlined">
//               Edit
//             </Button>
//             {isEditingMobile ? (
//               <form onSubmit={handleMobileEditSubmit}>
//                 <TextField
//                   id="editedMobile"
//                   label="Mobile Number"
//                   variant="outlined"
//                   fullWidth
//                   value={editedMobile}
//                   onChange={(e) => setEditedMobile(e.target.value)}
//                   style={{marginTop:"10px"}}
//                 />
//                 <Button type="submit" variant="contained" color="primary" mt={2} style={{marginTop:"10px"}}>
//                   Save
//                 </Button>
//               </form>
//             ) : (
//               <Typography variant="h6" mt={2}>
//                 {localStorage.getItem('userMobile')}
//               </Typography>
//             )}
//           </div>
//           {/* FAQ Section */}
          
//           <div className="deactivate-link">Deactivate Account</div>
//         </div>
//       </Grid>
//     </Grid>
//   );
// };

// export default UserProfile;



import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "./layout/MetaData";
// import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./UserProfile.css";

const Profile = () => {
  return (
        <Fragment>
          <MetaData title={`${localStorage.getItem("userName")}'s Profile`} />
          <div className="profileContainer">
            <div>
              {/* <h1>My Profile</h1> */}
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