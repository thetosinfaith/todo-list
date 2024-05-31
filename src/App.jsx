import React, { useState } from "react";
import "./App.css";
import userPlaceholder from "./assets/image-placeholder.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faCircle, faClock, faCheck } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [userProfilePicture, setUserProfilePicture] = useState(null);
  const [taskForTheDay, setTaskForTheDay] = useState("Read for 30 minutes..");
  const [isEditing, setIsEditing] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTaskTime, setSelectedTaskTime] = useState("");

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

  const handleTimeIconClick = () => {
    const timeInput = document.getElementById("timeInput");
    timeInput.click();
  };

  const handleTimeChange = (event) => {
    setSelectedTaskTime(event.target.value);
  };

  const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText) {
      const newTask = { id: tasks.length + 1, text: taskText, time: selectedTaskTime };
      setTasks([...tasks, newTask]);
      taskInput.value = "";
      setSelectedTaskTime("");
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
            <FontAwesomeIcon icon={faCircle} size="sm" style={{ color: "#FFD43B", marginRight: "25px" }} />
            <span>To-do</span>
          </li>
          <li className="taskCategories">
            <FontAwesomeIcon icon={faCircle} size="sm" style={{ color: "#63E6BE", marginRight: "25px" }} />
            <span>In Progress</span>
          </li>
          <li className="taskCategories">
            <FontAwesomeIcon icon={faCircle} size="sm" style={{ color: "#74C0FC", marginRight: "25px" }} />
            <span>Completed</span>
          </li>
        </ul>
      </div>
    
        <div className="write-tasks">
          <ul className="list">
            <li className="icons">
              <FontAwesomeIcon icon={faCircle} size="sm" style={{ color: "#FFD43B",  animation: "bounce 1s infinite alternate", marginRight: "25px" }} />
              <FontAwesomeIcon icon={faCircle} size="sm" style={{ color: "#63E6BE", animation: "bounce 1s infinite alternate", marginRight: "25px" }} />
              <FontAwesomeIcon icon={faCircle} size="sm" style={{ color: "#74C0FC", animation: "bounce 1s infinite alternate", marginRight: "25px" }} />
              <input type="text" id="taskInput" placeholder=" What's your next task?" />
              <input type="time" id="timeInput" style={{ display: "none" }} onChange={handleTimeChange} />
              <FontAwesomeIcon icon={faClock} size="sm" style={{ color: "#B197FC", marginLeft: "25px", cursor: "pointer" }} onClick={handleTimeIconClick} />
              <FontAwesomeIcon icon={faCheck} size="sm" style={{ color: "#B197FC", marginLeft: "25px", cursor: "pointer" }} onClick={addTask} />   
            </li>
          </ul>

          
 
          <br />
          <br />

          <div className="other-tasks">
            <ul className="tasks-list">
              {tasks.map(task => (
                <li key={task.id} className="icons">
                  <FontAwesomeIcon icon={faCircle} size="sm" style={{ color: "#FFD43B", marginRight: "25px" }} />
                  {task.text} {task.time && `at ${task.time}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  );
};

export default App;
