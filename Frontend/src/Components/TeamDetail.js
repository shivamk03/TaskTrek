import React from "react";

export default function TeamDetail(props) {
  const tasks = [
    {
      id: 1,
      heading: "new one",
      description: "new one",
      category: "category",
      start: "2024-06-23",
      end: "2024-07-12",
      status: "false",
      taskCOmment: "null",
    },
    {
      id: 2,
      heading: "new one",
      description: "new one",
      category: "category",
      start: "2024-06-23",
      end: "2024-07-12",
      status: "false",
      taskCOmment: "null",
    },
    {
      id: 3,
      heading: "new one",
      description: "new one",
      category: "category",
      start: "2024-06-23",
      end: "2024-07-12",
      status: "false",
      taskCOmment: "null",
    },
  ];
  return (
    <div className="detailsContainer">
      <div className="cont">
        <h2>{props.heading}</h2>
        <p>start : {props.start}</p>
        <p>end :{props.end}</p>
        <br />
        <p>{props.description}</p>
        <br />
        {props.status != undefined ? (
          <>
            <br />
            <p>{props.status}</p>
            <br />
          </>
        ) : (
          ""
        )}
        {props.comment != undefined ? (
          <>
            <br />
            <p>{props.comment}</p>
            <br />
          </>
        ) : (
          ""
        )}
        <div className="cont-details">
          <label htmlFor="comment">Add Comment</label>
          <input type="text" />
          <button type="submit">Post</button>
        </div>
      </div>
    </div>
  );
}
