import React from 'react';
import './css/DashboardTeam.css';
import SidebarAdmin from './SidebarAdmin';
import AllTasks from './AllTasks';

const DashboardAdminAllTask = (props) => {
  return (
    <div className="dashboard">
      <SidebarAdmin />
      <div className="content">
       <AllTasks/>
      </div>
      
    </div>
  );
};

export default DashboardAdminAllTask;