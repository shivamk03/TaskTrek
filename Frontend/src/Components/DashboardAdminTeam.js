import React from 'react';
import './css/DashboardTeam.css';
import SidebarAdmin from './SidebarAdmin';
import AddTeam from './AddTeam';

const DashboardAdminTeam = (props) => {
  return (
    <div className="dashboard">
      <SidebarAdmin />
      <div className="content">
       <AddTeam/>
      </div>
      
    </div>
  );
};

export default DashboardAdminTeam;
