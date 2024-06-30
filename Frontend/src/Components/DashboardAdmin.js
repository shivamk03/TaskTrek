import React from 'react';
import './css/DashboardAdmin.css';
import SidebarAdmin from './SidebarAdmin';
import TeamCard from './TeamCard'
import TeamDetail from './TeamDetail';

const DashboardAdmin = (props) => {
    const team = [{
      id:1,
        username:"new user 1"
    },{
      id:2,
        username:"new user 2"
    },{
      id:3,
       username:"new user 3"
    }]
  return (
    <div className="dashboard">
      <SidebarAdmin />
      {props.details==="true"?<TeamDetail/>:<div className="content">
        <div className="card-admin">
          <h1>Company Name</h1>
        </div>
        <h2>The Team</h2>
        {team.map((team =>{
            return(<TeamCard key = {team.id} username={team.username} />);
        }))}
        
      </div>}
      
    </div>
  );
};

export default DashboardAdmin;
