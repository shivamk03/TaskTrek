import React, { useContext, useState, useEffect } from "react";
import "./css/Contact.css";
import AdminContext from "../Context/AdminContext";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();
  const data = useContext(AdminContext);
  const { state, addTask } = data;


  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    end: "",
    date: "",
  });

  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    if (!localStorage.getItem("Authorization")) {
      alert("Session Timeout");
      const timeout = setTimeout(() => navigate("/admin/login"), 0);
      return () => clearTimeout(timeout);
    }
    let currentDate = new Date();
    currentDate=currentDate.toISOString().substring(0,19).replace("T"," ");
    setMinDate(currentDate);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      const values = document.getElementsByClassName("inputs");
      for (let i = 0; i < values.length; i++) {
        if (values[i].checked) {
          const value = values[i].value;
          let str = document.getElementById("end").value;
          str = str.replace("T"," ");
          str+=":00";
          addTask(
            value,
            str,
            document.getElementById("heading").value,
            document.getElementById("description").value
          );
        }
      }
      alert("Added");
      navigate("/dashadmin");
    } catch (e) {
      console.log(e);
    }
  };

  const handleClickSearch=(e)=>{
    e.preventDefault();
    var user = document.getElementById('user').value;
    var check = false;
    for(var i =0;i<state.length;i++){
      if(state[i].username===user){
        alert("Member added to task.");
        document.getElementById(user).click();
        check=true;
        break;
      }
    }
    if(check==false){
      alert("Member not present.");
    }
  }
  return (
    <div className="contact-form-container">
      <form onSubmit={handleSubmit} className="contact-form">
        <h2>Add Task for members</h2>
        <div className="form-group">
          <div className="user-container">
            <label htmlFor="user">Search user: </label>
            <input type="text" name="user" id="user" />
            <button onClick={handleClickSearch} className="user-search-btn">Search</button>
            <br />
            <br />
            {state.map((team) => {
              return (
                <div key={team.id}>
                  <label htmlFor={team.id}>{team.username}</label>
                  <input
                    type="radio"
                    key={team.id}
                    value={team.username}
                    name={team.username}
                    id={team.username}
                    
                    className="inputs"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="username">Heading</label>
          <input
            type="text"
            id="heading"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="end">End Date</label>
          <input
            type="datetime-local"
            id="end"
            name="end"
            value={formData.end}
            onChange={handleChange}
            min={minDate}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTask;
