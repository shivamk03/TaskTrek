import React from 'react';
import './css/SidebarTeam.css';
import { Link } from 'react-router-dom';
const SidebarTeam = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/dashteam">Home</Link></li>
        <li><Link to="/dashteam/todo">Assigned Tasks</Link></li>
        <li><Link to="/dashteam/done">Done</Link></li>
        <li><Link to="/dashteam/search">Search</Link></li>
      </ul>
    </div>
  );
};

export default SidebarTeam;
