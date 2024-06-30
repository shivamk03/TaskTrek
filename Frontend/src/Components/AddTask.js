import React, { useState } from 'react';
import './css/Contact.css';

const AddTask = () => {
  const teams = [{
    id:1,
    username:"new user 1"
  },{
    id:2,
    username:"new user 2"
  },{
    id:3,
    username:"new user 3"
  }]
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
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (


    <div className="contact-form-container">
      <form onSubmit={handleSubmit} className="contact-form">
        <h2>Add Task for members</h2>
        <div className="form-group">
          {teams.map(team=>{
            return (<><label for={team.id}>{team.username}</label><input type='radio' key ={team.id} value={team.username} name={team.id} id={team.id} className='inputs'/></>);
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
