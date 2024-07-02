import React, { useContext, useState } from 'react';
import './css/Contact.css';
import AdminContext from '../Context/AdminContext';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const navigate = useNavigate();
  const data = useContext(AdminContext);
  const {state,addTask}= data;

  const [formData, setFormData] = useState({
    heading: '',
    description:'',
    end:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    try{
    e.preventDefault();
    const values = document.getElementsByClassName('inputs');
    console.log(values);
    for(let i=0;i<values.length;i++){
      if(values[i].checked){
        const value = values[i].value;
        console.log(value);
        let res =addTask(value, document.getElementById('end').value, document.getElementById('heading').value, document.getElementById('description').value);
      }
    }
    alert("Added");
    navigate("/dashadmin")
  }catch(e){
    console.lag(e);
  }
  };

  return (


    <div className="contact-form-container">
      <form onSubmit={handleSubmit} className="contact-form">
        <h2>Add Task for members</h2>
        <div className="form-group">
          {state.map(team=>{
            return (<><label htmlFor={team.id}>{team.username}</label><input type='radio' key ={team.id} value={team.username} name={team.id} id={team.id} className='inputs'/></>);
          })}
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
          <label htmlFor="end">End Date(yyyy-mm-dd)</label>
          <input
            type="text"
            id="end"
            name="end"
            value={formData.end}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default AddTask;
