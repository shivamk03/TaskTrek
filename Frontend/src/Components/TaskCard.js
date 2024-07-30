import React, { useContext } from "react";
import "./css/TaskCard.css";
import { useNavigate } from "react-router-dom";
import TeamMemberContext from "../Context/TeamMemberContext";

export default function TaskCard(props) {
  const data = useContext(TeamMemberContext);
  const { updateTask } = data;
  const navigate = useNavigate();
  const start = `${props.start.substring(0,11)} ${props.start.substring(24,28)}  at ${props.start.substring(11,19)}`;
  const end = `${props.end.substring(0,11)}${props.end.substring(24,28)}  at ${props.end.substring(12,19)}`;
  const complete = props.complete==null?'':`${props.complete.substring(0,11)} ${props.end.substring(24,28)}  at ${props.complete.substring(12,19)}`;
  const handleClick = (e) => {
    e.preventDefault();
    updateTask(props.heading);
    navigate("/dashteam/detail");
  };
  return (
    <div>
      <div className="task-card-task">
        {props.done==="true"?<h4 >Status: <span id="status">Completed</span></h4>:''}
        <h4><span className="bold">Task:</span> {props.heading}</h4>
        <p><span className="bold">Details:</span> {props.description}</p>
        <br />
        <p><span className="bold">Assigned on:</span> {start}</p>
        <p><span className="bold">Deadline:</span> {end}</p>
        {props.complete?<p><span className="bold">Submitted on:</span> {complete}</p>:''}
        {props.taskComment ? <p><span className="bold">Comment:</span> {props.taskComment}</p> : ""}
        {props.buttonView == false ? (
          ""
        ) : 
          <button className="detailedView" onClick={handleClick}>
            {props.button}
          </button>
        }
      </div>
    </div>
  );
}
