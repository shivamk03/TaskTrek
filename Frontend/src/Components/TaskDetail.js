import React, { useContext } from "react";
import "./css/TaskDetail.css";
import TeamMemberContext from "../Context/TeamMemberContext";
import { useNavigate } from "react-router-dom";
export default function TaskDetail(props) {
  const navigate = useNavigate();
  const data = useContext(TeamMemberContext);
  const {updateComment} = data;
  const handleClick=async(e)=>{
    e.preventDefault();
    const comment = document.getElementById("comment").value;
    await updateComment(props.id,comment);
    alert("Status Updated");
    navigate('/dashteam')
  }
  return (
    <div className="detailsContainer">
      <div className="cont">
        <h2>{props.heading}</h2>
        <p><span>Description:</span> {props.description}</p>
        <br />
        <p><span>Assigned Date:</span> {props.start.substring(0,11)} {props.start.substring(24,28)}  at {props.start.substring(11,19)}</p>
        <p><span>Deadline:</span> {props.end.substring(0,11)} {props.end.substring(24,28)}  at {props.end.substring(11,19)}</p>
        <label htmlFor="comment" id="label">Add Comment:</label>
        <div className="cont-details">
          <textarea type="text" id="comment"/>
          <button type="submit" onClick={handleClick}>Post</button>
        </div>
      </div>
    </div>
  );
}
