import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [userImage, setUserImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="parent-container">
      <div className="wrapper">
        <div className="left">
          <br/>
          <div className="userContainer">
            <div 
              className="userPicture" 
              style={{ backgroundImage: `url(${userImage})` }}
              id="userPicture"
            ></div>
            <input 
              type="file" 
              id="imageInput" 
              accept="image/*" 
              onChange={handleImageChange}
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
