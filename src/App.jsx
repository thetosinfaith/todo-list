import React, { useState } from "react";
import "./App.css";
import userPlaceholder from "./assets/image-placeholder.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faTasks } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [userProfilePicture, setUserProfilePicture] = useState(null);
  const [taskForTheDay, setTaskForTheDay] = useState("Read for 30 minutes..");
  const [isEditing, setIsEditing] = useState(false);

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

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event) => {
   
    setTaskForTheDay(event.target.innerText);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
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
      
      <div className="right">
        <h2 className="title">Main Goal For Today</h2>
        <h1 
          className={`texts ${isEditing ? 'editing' : ''}`}
          contentEditable={isEditing}
          onClick={handleTitleClick}
          onBlur={handleTitleBlur}
          onInput={handleTitleChange}
        >
          {taskForTheDay}
        </h1>

        <div className="write-tasks">
          <ul className="list">
            <li className="icons">
              <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#FFD43B", marginRight: "25px" }} />
              <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#63E6BE", marginRight: "25px" }} />
              <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#74C0FC", marginRight: "25px" }} />

              <input type="text" id="taskInput" placeholder=" What's your next task?" />

              <FontAwesomeIcon icon={faClock} size="sm" style={{color: "#B197FC", marginLeft: "25px" }} />
              <FontAwesomeIcon icon={faTasks} size="sm" style={{ color: "#B197FC", marginLeft: "25px" }} />   
            </li>
          </ul>

          <div className="other-tasks">
            <ul className="list-2">
            <li className="icons">
              <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#FFD43B", marginRight: "25px" }} />
            </li>
            <li className="icons">
              <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#63E6BE", marginRight: "25px" }} />
            </li>
            <li className="icons">
              <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#74C0FC", marginRight: "25px" }} />
            </li>

            </ul>

          </div>

          <br />         
        </div>
      </div>
    </div>
  );
};

export default App;
