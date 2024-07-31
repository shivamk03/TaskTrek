import React, { useContext, useState } from 'react';
import './css/Contact.css';
import { useNavigate } from 'react-router-dom';
import AdminContext from '../Context/AdminContext';

const AddTeam = () => {
  const navigate = useNavigate();
  const data = useContext(AdminContext);
  const {addTeamMember, getTeam}= data;
  const [formData, setFormData] = useState({
    username: '',
    name:'',
    role:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddTeam = (e) => {
    e.preventDefault();
    const res =addTeamMember(document.getElementById("username").value,document.getElementById("name").value, document.getElementById('role').value);
    if(res){
      alert("Team Member added");
      getTeam();
      navigate('/dashadmin');
    }
    else{
      alert("Some error occurred");
      navigate('/dashadmin')
    }
  };

  return (
    <div className="contact-form-container">
      <form onSubmit={handleAddTeam} className="contact-form">
        <h2>Add Team Member</h2>
        <div className="form-group">
          <label htmlFor="username">UserName</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default AddTeam;
