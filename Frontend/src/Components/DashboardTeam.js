import React from 'react';
import SidebarTeam from './SidebarTeam';
import './css/DashboardTeam.css';
import TaskCard from './TaskCard';
import TaskDetail from './TaskDetail';
import { useNavigate } from 'react-router-dom';
import TeamMemberContext from '../Context/TeamMemberContext';
import { useContext } from 'react';
import { useEffect } from 'react';

const DashboardTeam = (props) => {
  const navigate = useNavigate();
  const data = useContext(TeamMemberContext);
  const {state,fetchAllTasks} = data;
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
      {props.details?<TaskDetail/>: <div className="content">
        <div className="card">
          <h1>Company Name</h1>
        </div>
        <h2>{props.dashValue} Tasks</h2>
        {state.map((task =>{
            return(<TaskDetail id ={task.id}key = {task.id} heading = {task.heading} end ={task.end} description={task.description} status={task.status} taskComment = {task.taskCommentcomment} start ={task.start}/>);
        }))}
        
      </div>}
      
    </div>
  );
};

export default DashboardTeam;
