import React from 'react';
import SidebarTeam from './SidebarTeam';
import './css/DashboardTeam.css';
import TaskDetail from './TaskDetail';
import { useNavigate } from 'react-router-dom';
import TeamMemberContext from '../Context/TeamMemberContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import TaskCard from './TaskCard';

const DashboardTeam = (props) => {
  const navigate = useNavigate();
  const data = useContext(TeamMemberContext);
  const {state,fetchAllTasks, company} = data;
  
  useEffect(() => {
    if (!localStorage.getItem("logged")) {
      alert("Session Timeout");
      const timeout = setTimeout(() => navigate("/admin/login"),0);
      return () => clearTimeout(timeout);
    }
    fetchAllTasks();
    // fetchCompany();
  },[]);
  return (
    <div className="dashboard">
      <SidebarTeam />
      {props.details?<TaskDetail/>: <div className="content">
        <div className="card">
          <h1>{company.company}</h1>
        </div>
        <h2>{props.dashValue} Upcoming Tasks</h2>
        {state.map((task =>{
          if(task.t.status==="false")
            return(<TaskCard button="Detailed View"id ={task.t.id}key = {task.t.id} heading = {task.t.heading} end ={task.end} description={task.t.description} status={task.t.status} taskComment = {task.t.taskCommentcomment} start ={task.start}/>);
        }))}
        
      </div>}
      
    </div>
  );
};

export default DashboardTeam;
