import React from "react";
import "./css/TaskDetail.css";
export default function TaskDetail(props) {
  return (
    <div className="detailsContainer">
      <div className="cont">
        <h2>{props.heading}</h2>
        <p>start : {props.start}</p>
        <p>end :{props.end}</p>
        <br />
        <p>{props.description}</p>
        <br />
        {props.status!= undefined ?<><br /><p>{props.status}</p><br /></>:""}
        {props.comment!= undefined ?<><br /><p>{props.comment}</p><br /></>:""}
        <div className="cont-details">
          <label htmlFor="comment">Add Comment</label>
          <input type="text" />
          <button type="submit">Post</button>
        </div>
      </div>
    </div>
  );
}
