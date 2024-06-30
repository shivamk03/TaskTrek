import React from 'react';
import './css/SidebarTeam.css';
import { Link } from 'react-router-dom';

const SidebarAdmin = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/dashadmin">Team</Link></li>
        <li><Link to="/dashadmin/addteam">Add team member</Link></li>
        <li><Link to="/dashadmin/add">Add task</Link></li>
        <li><Link to="/dashadmin/all">Fetch All tasks</Link></li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
