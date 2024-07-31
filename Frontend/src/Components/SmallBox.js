import React from "react";
import { useContext } from "react";
import AdminContext from "../Context/AdminContext";
export default function SmallBox(props) {
  const data = useContext(AdminContext);
  const {deleteTask} = data;
  const handleDelete = async(e) => {
    e.preventDefault();
    if(window.confirm("Are you sure you want to delete?")==true){
      await deleteTask(props.id);
      alert("Deleted Successfully");
    }
    window.location.reload();
  };
  return (
    <div className="smallbox">
      {props.memberName?<h4>Member name : {props.memberName}</h4>:''}
      {props.status === "true" ? (
        <h4>
          Status: <span className="statusSpanC">Completed</span>
        </h4>
      ) : (
        <h4>
          Status: <span className="statusSpanP">Pending</span>
        </h4>
      )}
      <p>
        <span className="bold">Heading :</span> {props.heading}
      </p>
      <p>
        <span className="bold">Description :</span> {props.description}
      </p>
      {props.comment ? (
        <p>
          <span className="bold">Comment by Team Mate:</span> {props.comment}
        </p>
      ) : (
        ""
      )}
      <br />
      {props.start ? (
        <p>
          <span className="bold">Assigned date: </span>
          {props.start.substring(0, 10) + " at "+props.start.substring(12,20)}
        </p>
      ) : (
        ""
      )}
      {props.end ? (
        <p>
          <span className="bold">Deadline on: </span>
          {props.end.substring(0, 10) + " at "+props.end.substring(12,20)}
        </p>
      ) : (
        ""
      )}
      {props.complete ? (
        <p>
          <span className="bold">Submitted on: </span>
          {props.complete.substring(0, 10) + " at "+props.complete.substring(12,20)}
        </p>
      ) : (
        ""
      )}
      <button className="deleteTask" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
