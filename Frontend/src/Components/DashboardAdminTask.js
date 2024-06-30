import React from 'react';
import './css/DashboardTeam.css';
import SidebarAdmin from './SidebarAdmin';
import AddTask from './AddTask';

const DashboardAdminTask = (props) => {
  return (
    <div className="dashboard">
      <SidebarAdmin />
      <div className="content">
       <AddTask/>
      </div>
      
    </div>
  );
};

export default DashboardAdminTask;
