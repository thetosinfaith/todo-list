import React, { useState } from "react";
import "./App.css";
import userPlaceholder from "./assets/image-placeholder.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

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
        
        <div className="left">
          <br/>

          <div className="userContainer">
            <div className="userPicture" style={{backgroundImage: `url(${userProfilePicture || userPlaceholder})`}} id="userPicture">
              <input 
                type="file" 
                id="imageInput" 
                accept="image/*" 
                onChange={handleProfilePictureChange}
              />
            </div>
          </div>
          
          <div className="categories-header">
            <div className="icon-text">
              <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#B197FC", marginRight: "10px"}} /> 
              <h4 style={{ marginLeft: "5px" }}>ToDo List</h4>
            </div>
          </div>

          <br />
          <ul className="taskCategoriesList">
            <li className="taskCategories">
              <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#FFD43B", marginRight: "25px" }} />
              <span>To-do</span>
            </li>
            <li className="taskCategories">
              <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#63E6BE", marginRight: "25px" }} />
              <span>Completed</span>
            </li>
            <li className="taskCategories">
              <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#74C0FC", marginRight: "25px" }} />
              <span>In Progress</span>
            </li>
          </ul>
        </div>
        
         <div class="right">
         <h2 className="title">Main Goal For Today</h2>
          <h1 className="texts">Read for 30 minutes..</h1>

          <div className="write-tasks">What's your next task?</div>

          <br />
          <br />
          
          <div className="tasks">What's your next task?</div>
          <div className="tasks">What's your next task?</div>
          <div className="tasks">What's your next task?</div>
    </div>

    


    </div>
  );
};

export default App;
