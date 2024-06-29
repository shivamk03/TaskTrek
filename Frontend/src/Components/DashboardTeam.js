import React from 'react';
import SidebarTeam from './SidebarTeam';
import './css/DashboardTeam.css';
import TaskCard from './TaskCard';

const DashboardTeam = (props) => {
    const tasks = [{
        id:1,
        heading:"new one",
        description:"new one",
        category : "category",
        start:"2024-06-23",
        end:"2024-07-12",
        status:"false",
        taskCOmment:"null"
    },{
        id:2,
        heading:"new one",
        description:"new one",
        category : "category",
        start:"2024-06-23",
        end:"2024-07-12",
        status:"false",
        taskCOmment:"null"
    },{
        id:3,
        heading:"new one",
        description:"new one",
        category : "category",
        start:"2024-06-23",
        end:"2024-07-12",
        status:"false",
        taskCOmment:"null"
    }]
  return (
    <div className="dashboard">
      <SidebarTeam />
      <div className="content">
        <div className="card">
          <h1>Company Name</h1>
        </div>
        <h2>{props.dashValue} Tasks</h2>
        {tasks.map((task =>{
            return(<TaskCard key = {task.key} heading = {task.heading} end ={task.end} />);
        }))}
      </div>
    </div>
  );
};

export default DashboardTeam;
