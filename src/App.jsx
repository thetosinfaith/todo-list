import React, { useState } from "react";
import "./App.css";
import userPlaceholder from "./assets/image-placeholder.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faCircle, faCheck, faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [userProfilePicture, setUserProfilePicture] = useState(null);
  const [selectedTaskTime, setSelectedTaskTime] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todo");
  const [tasks, setTasks] = useState([]);

  const [filter, setFilter] = useState('all');

  const handleStatusChange = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: getNextStatus(task.status) } : task));
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'todo':
        return 'inprogress';
      case 'inprogress':
        return 'completed';
      case 'completed':
        return 'todo';
      default:
        return 'todo';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo':
        return '#FFD43B';
      case 'inprogress':
        return '#63E6BE';
      case 'completed':
        return '#74C0FC';
      default:
        return '#FFFFFF';
    }
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.status === filter);

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
      const newTask = { id: tasks.length + 1, text: taskText, time: selectedTaskTime, status: selectedStatus };
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
            <h4 style={{ marginLeft: "5px" }}>Taaskly</h4>
          </div>
        </div>

        <br />
        <ul className="taskCategoriesList">
          <li className="taskCategories" onClick={() => setFilter('todo')}>
            <FontAwesomeIcon icon={faCircle} size="sm" style={{ color: "#FFD43B", marginRight: "25px", cursor: "pointer" }} />
            <span>To-do</span>
          </li>
          <li className="taskCategories" onClick={() => setFilter('inprogress')}>
            <FontAwesomeIcon icon={faCircle} size="sm" style={{ color: "#63E6BE", marginRight: "25px", cursor: "pointer" }} />
            <span>In Progress</span>
          </li>
          <li className="taskCategories" onClick={() => setFilter('completed')}>
            <FontAwesomeIcon icon={faCircle} size="sm" style={{ color: "#74C0FC", marginRight: "25px", cursor: "pointer" }} />
            <span>Completed</span>
          </li>
          <li className="taskCategories" onClick={() => setFilter('all')}>
            <FontAwesomeIcon icon={faCircle} size="sm" style={{ color: "#808080", marginRight: "25px", cursor: "pointer" }} />
            <span>All</span>
          </li>
        </ul>
      </div>
    
      <div className="write-tasks">
        <ul className="list">
          <li className="icons">
          
<FontAwesomeIcon
  icon={faCircle}
  size="sm"
  style={{
    color: selectedStatus === 'todo' ? "#FFD43B" : "#FFD43B55",
    animation: "bounce 1s infinite alternate",
    marginRight: "25px",
    cursor: "pointer"
  }}
  onClick={() => {
    if (selectedStatus !== 'todo') setSelectedStatus('todo');
  }}
/>
<FontAwesomeIcon
  icon={faCircle}
  size="sm"
  style={{
    color: selectedStatus === 'inprogress' ? "#63E6BE" : "#63E6BE55",
    animation: "bounce 1s infinite alternate",
    marginRight: "25px",
    cursor: "pointer"
  }}
  onClick={() => {
    if (selectedStatus !== 'inprogress') setSelectedStatus('inprogress');
  }}
/>
<FontAwesomeIcon
  icon={faCircle}
  size="sm"
  style={{
    color: selectedStatus === 'completed' ? "#74C0FC" : "#74C0FC55",
    animation: "bounce 1s infinite alternate",
    marginRight: "25px",
    cursor: "pointer"
  }}
  onClick={() => {
    if (selectedStatus !== 'completed') setSelectedStatus('completed');
  }}
/>
            <input type="text" id="taskInput" placeholder=" What's your next task?" />
            <FontAwesomeIcon icon={faCheck} size="sm" style={{ color: "#B197FC", marginLeft: "20px", cursor: "pointer" }} onClick={addTask} />   
          </li>
        </ul>

        <br />
        <br />

        <div className="other-tasks">
  <ul className="tasks-list">
    {filteredTasks.map(task => (
      <li key={task.id} className="task-item">
        <div className="task-content">
          <FontAwesomeIcon
            icon={faCircle}
            size="sm"
            style={{ color: getStatusColor(task.status), marginRight: "10px", cursor: "pointer" }}
            onClick={() => handleStatusChange(task.id)}
          />
          {task.text} {task.time && `at ${task.time}`}
        </div>
        <div className="icon-container">
          <FontAwesomeIcon icon={faEdit} className="edit-icon" />
          <FontAwesomeIcon icon={faTrashCan} className="trash-icon" />
        </div>
      </li>
    ))}
  </ul>
</div>
      </div>
    </div>
  );
};

export default App;
