import React, { useState } from "react";
import SidebarTeam from "./SidebarTeam";
import "./css/DashboardTeam.css";
import TaskDetail from "./TaskDetail";
import { useNavigate } from "react-router-dom";
import TeamMemberContext from "../Context/TeamMemberContext";
import { useContext } from "react";
import { useEffect } from "react";
import TaskCard from "./TaskCard";

const DashboardTeamSearch = (props) => {
  const navigate = useNavigate();
  const data = useContext(TeamMemberContext);
  const [currentSelection, setSelection] = useState({
    currentSelection: "startDate",
  });
  const [searchRes, setSerachRes] = useState([]);
  const { state, fetchAllTasks, fetchCompany, company } = data;
  useEffect(() => {
    if (!localStorage.getItem("logged")) {
      alert("Session Timeout");
      const timeout = setTimeout(() => navigate("/admin/login"), 0);
      return () => clearTimeout(timeout);
    }
    fetchAllTasks();
  }, []);
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  const handleChange = () => {
    setSerachRes([]);
    setSelection({
      currentSelection: document.getElementById("criteria").value,
    });
  };

  const handleStartDate = (evt) => {
    evt.preventDefault();
    var searches = [];
    const e = document.getElementById("startDate").value;
    if(e===""){
      alert("Please enter the heading");
    } 
    state.map((task) => {
      var date =
        task.start.substring(0, 10) + "," + task.start.substring(24, 28);
      if (formatDate(date) === e) searches.push(task);
    });
    setSerachRes(searches);
  };
  const handleEndDate = (evt) => {
    evt.preventDefault();
    var searches = [];
    const e = document.getElementById("endDate").value;
    if(e===""){
      alert("Please enter the heading");
    }
    state.map((task) => {
      var date = task.end.substring(0, 10) + "," + task.end.substring(24, 28);
      if (formatDate(date) === e) searches.push(task);
    });
    setSerachRes(searches);
  };
  const handleHeading = (evt) => {
    evt.preventDefault();
    var searches = [];
    const e = document.getElementById("heading").value;
    if(e===""){
      alert("Please enter the heading");
    }
    state.map((task) => {
      if (task.t.heading === e) searches.push(task);
    });
    setSerachRes(searches);
  };
  const handleComplete = (evt) => {
    evt.preventDefault();
    var searches = [];
    state.map((task) => {
      if (task.t.status === "true") {
        searches.push(task);
      }
    });
    setSerachRes(searches);
  };
  const handlePending = (evt) => {
    evt.preventDefault();
    var searches = [];
    state.map((task) => {
      if (task.t.status === "false") searches.push(task);
    });
    setSerachRes(searches);
  };

  return (
    <div className="dashboard">
      <SidebarTeam />
      {props.details ? (
        <TaskDetail />
      ) : (
        <div className="content">
          <h2>Search Tasks</h2>

          <div className="card-search">
            <div className="criteria">
              <label htmlFor="criteria">Search By:</label>
              <select name="criteria" id="criteria" onChange={handleChange}>
                <option value="startDate">Start Date</option>
                <option value="endDate">End Date</option>
                <option value="heading">Task Heading</option>
                <option value="complete">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            {currentSelection.currentSelection == "startDate" ? (
              <div className="date">
                <label htmlFor="startDate" className="label-search">
                  Enter date:{" "}
                </label>
                <input type="date" id="startDate" name="startDate" />
                <div className="search-submit">
                  <button type="submit" onClick={handleStartDate}>
                    Search
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
            {currentSelection.currentSelection == "endDate" ? (
              <div className="date">
                <label htmlFor="endDate">Enter date: </label>
                <input type="date" id="endDate" name="endDate" />
                <div className="search-submit">
                  <button type="submit" onClick={handleEndDate}>
                    Search
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
            {currentSelection.currentSelection == "heading" ? (
              <div className="heading-container">
                <label htmlFor="heading">Enter Heading: </label>
                <input type="text" name="heading" id="heading" />
                <div className="search-submit">
                  <button type="submit" onClick={handleHeading}>
                    Search
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
            {currentSelection.currentSelection == "complete" ? (
              <div className="completed">
                <div className="search-submit">
                  <button type="submit" onClick={handleComplete}>
                    Search
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
            {currentSelection.currentSelection == "pending" ? (
              <div className="pending">
                <div className="search-submit">
                  <button type="submit" onClick={handlePending}>
                    Search
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          {searchRes.map((task) => {
            if (currentSelection.currentSelection === "complete") {
              return <TaskCard
                buttonView={false}
                done="true"
                complete={task.complete}
                key={task.t.id}
                heading={task.t.heading}
                end={task.end}
                description={task.t.description}
                status={task.t.status}
                taskComment={task.t.taskComment}
                start={task.start}
              />;
            }

            return (
              <TaskCard
                button="Detailed View"
                id={task.t.id}
                key={task.t.id}
                heading={task.t.heading}
                end={task.end}
                description={task.t.description}
                status={task.t.status}
                taskComment={task.t.taskCommentcomment}
                start={task.start}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardTeamSearch;
