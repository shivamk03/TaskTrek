import React from 'react';
import SidebarTeam from './SidebarTeam';
import './css/DashboardTeam.css';
import TaskDetail from './TaskDetail';
import { useNavigate } from 'react-router-dom';
import TeamMemberContext from '../Context/TeamMemberContext';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import TaskCard from './TaskCard';

const DashboardTeamDone = (props) => {
  const navigate = useNavigate();
  const data = useContext(TeamMemberContext);
  const [todo,settodo] = useState([]);
  const {state,fetchAllTasks, company} = data;
  useEffect(() => {
    if (!localStorage.getItem("logged")) {
      alert("Session Timeout");
      const timeout = setTimeout(() => navigate("/admin/login"),0);
      return () => clearTimeout(timeout);
    }
    fetchAllTasks();
    state.map(s=>{
      if(s.t.status==="true"){
        let temp = todo;
        temp.push(s);
        settodo(temp);
      }
    })
  },[]);

  return (
    <div className="dashboard">
      <SidebarTeam />
      {props.details?<TaskDetail/>: <div className="content">
        <div className="card">
          <h1>{company.company}</h1>
        </div>
        <h2>Done Tasks</h2>
        {todo.map((task =>{
            return(<><TaskCard buttonView = {false} done="true" complete = {task.complete}key = {task.t.id} heading = {task.t.heading} end ={task.end} description={task.t.description} status={task.t.status} taskComment = {task.t.taskComment} start ={task.start}/></>);
        }))}
        
      </div>}
      
    </div>
  );
};

export default DashboardTeamDone;
