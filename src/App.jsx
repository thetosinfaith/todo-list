import React, { useState } from "react";
import "./App.css";
import userPlaceholder from "./assets/image-placeholder.jpg";


const App = () => {
  const [userProfilePicture, setUserProfilePicture] = useState(null);

  const handleProfilePictureChange = (event) => {
    const selectedPicture = event.target.files[0];

    if (selectedPicture) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        setUserProfilePicture(e.target.result);
      };

      reader.onerror = (error) => {
        console.error('Error reading the file:', error);
      };

      reader.readAsDataURL(selectedPicture);
    }
  };

  return (
    <div className="parent-container">
      <div className="wrapper">
        <div className="left">
          <br/>

          <div className="userContainer">
            <div className="userPicture" style={{backgroundImage: `url(${userProfilePicture || userPlaceholder})`}} id="userPicture"></div>
           
            <input 
              type="file" 
              id="imageInput" 
              accept="image/*" 
              onChange={handleProfilePictureChange}
            />
            <div className="appName"><h2>Taskify</h2></div>
            <div className="userName"><h3>Tosin Faith</h3></div>
          </div>

          <ul>
            <li className="taskCategories">Personal</li>
            <li className="taskCategories">Freelance</li>
            <li className="taskCategories">Work</li>
          </ul>
        </div>

        <div className="right"></div> 
      </div>
    </div>
  );
};

export default App;
