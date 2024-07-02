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
    const comment = document.getElementById("comment").ariaValueMax;
    await updateComment(props.id,comment);
    alert("Status Updated");
    navigate('/dashteam')
  }
  return (
    <div className="detailsContainer">
      <div className="cont">
        <h2>{props.heading}</h2>
        <p>start : {props.start}</p>
        <p>end :{props.end}</p>
        <br />
        <p>Description: {props.description}</p>
        <br />
        {props.status!= undefined ?<><br /><p>Status: {props.status}</p><br /></>:""}
        {props.comment!= undefined ?<><br /><p>Comment: {props.comment}</p><br /></>:""}
        <div className="cont-details">
          <label htmlFor="comment">Add Comment</label>
          <input type="text" id="comment"/>
          <button type="submit" onClick={handleClick}>Post</button>
        </div>
      </div>
    </div>
  );
}
