import React from 'react';
import SidebarTeam from './SidebarTeam';
import './css/DashboardTeam.css';
import TaskDetail from './TaskDetail';
import { useNavigate } from 'react-router-dom';
import TeamMemberContext from '../Context/TeamMemberContext';
import { useContext } from 'react';
import { useEffect } from 'react';

const DashboardTeamDetail = () => {
  const navigate = useNavigate();
  const data = useContext(TeamMemberContext);
  const {state,fetchAllTasks,fetchCompany, company, currentTask} = data;
  useEffect(() => {
    if (!localStorage.getItem("logged")) {
      alert("Session Timeout");
      const timeout = setTimeout(() => navigate("/admin/login"),0);
      return () => clearTimeout(timeout);
    }
    fetchAllTasks();
  },[]);
  return (
    <div className="dashboard">
      <SidebarTeam />
      <div className="content">
        <div className="card">
          <h1>{company.company}</h1>
        </div>
        <h2>Task Details</h2>
        {state.map((task =>{
          if(task.t.heading===currentTask)
            return(<TaskDetail id ={task.t.id}key = {task.t.id} heading = {task.t.heading} complete = {task.t.complete} end ={task.end} description={task.t.description} status={task.t.status} taskComment = {task.t.taskComment} start ={task.start}/>);
        }))
        }
        
      </div>
      
    </div>
  );
};

export default DashboardTeamDetail;
