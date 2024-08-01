import React, { useEffect, useContext, useState } from "react";
import "./css/DashboardAdmin.css";
import SidebarAdmin from "./SidebarAdmin";
import { useNavigate } from "react-router-dom";
import AdminContext from "../Context/AdminContext";
import SmallBox from "./SmallBox";

const DashboardAdminSearch = (props) => {
  const navigate = useNavigate();
  const data = useContext(AdminContext);
  const { getTeam, getAllTask } = data;
  const [currentSelection, setSelection] = useState({
    currentSelection: "startDate",
  });

  //place storing data into this state from the context
  const [stateTask, setStateTask] = useState({});

  const [state, setState] = useState({});

  let resultFlag = false;
  useEffect(() => {
    if (!localStorage.getItem("Authorization")) {
      alert("Session Timeout");
      const timeout = setTimeout(() => navigate("/admin/login"), 0);
      return () => clearTimeout(timeout);
    }
    getTask();
    getTeam();
  }, []);

  const getTask = async () => {
    let res = await getAllTask();
    setState(res);
  };
  const handleChange = () => {
    setStateTask({});
    setSelection({
      currentSelection: document.getElementById("criteria").value,
    });
  };

  const handleStartDate = (e) => {
    e.preventDefault();
    var date = document.getElementById("startDate").value;
    let temp = {};
    Object.entries(state).map((t) => {
      t[1].map((e) => {
        if (e.start.substring(0, 10) === date) {
          temp[t[0]] = e;
        }
      });
    });
    setStateTask(temp);
  };

  const handleEndDate = (e) => {
    e.preventDefault();
    var date = document.getElementById("endDate").value;
    let temp = {};
    Object.entries(state).map((t) => {
      t[1].map((e) => {
        if (e.end.substring(0, 10) === date) {
          temp[t[0]] = e;
        }
      });
    });
    setStateTask(temp);
  };
  const handleHeading = (e) => {
    e.preventDefault();
    var heading = document.getElementById("heading").value;
    let temp = {};
    Object.entries(state).map((t) => {
      t[1].map((e) => {
        if (e.heading === heading) {
          temp[t[0]] = e;
        }
      });
    });
    setStateTask(temp);
  };
  const handleComplete = (e) => {
    e.preventDefault();
    let temp = {};
    Object.entries(state).map((t) => {
      t[1].map((e) => {
        if (e.status === "true") {
          temp[t[0]] = e;
        
        }
      });
    });
    setStateTask(temp);
  };
  const handlePending = (e) => {
    e.preventDefault();
    let temp = {};
    Object.entries(state).map((t) => {
      t[1].map((e) => {
        if (e.status === "false") {
          temp[t[0]] = e;
        }
      });
    });
    setStateTask(temp);
  };
  const handleUser=(e)=>{
    e.preventDefault();
    let temp = {};
    var user = document.getElementById("user").value;
    Object.entries(state).map((t) => {
        if (t[0]===user) {
          t[1].map(e=>{
            temp[t[0]]=e;
          })
        }
    });
    setStateTask(temp);
  }
  return (
    <div className="dashboard">
      <SidebarAdmin />
      <div className="content">
        <h2>Search Tasks</h2>
        <div className="card-search">
          <div className="criteria">
            <label htmlFor="criteria">Search By:</label>
            <select name="criteria" id="criteria" onChange={handleChange}>
              <option value="startDate">Start Date</option>
              <option value="endDate">End Date</option>
              <option value="user">Username</option>
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
          {currentSelection.currentSelection == "user" ? (
            <div className="heading-container">
              <label htmlFor="heading">Enter User: </label>
              <input type="text" name="user" id="user" />
              <div className="search-submit">
                <button type="submit" onClick={handleUser}>
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
        <div className="all-container">
          {Object.entries(stateTask).map((t) => {
              resultFlag=true;
              return (
                <div className="smallbox-container" key={t[0] + t[1].heading}>
                  <>
                    <SmallBox
                      key={t[1].heading+t[0]}
                      memberName = {t[0]}
                      heading={t[1].heading}
                      description={t[1].description}
                      status={t[1].status}
                      comment={t[1].taskComment}
                      start={t[1].start}
                      end={t[1].end}
                      complete={t[1].complete}
                      />
                  </>
                </div>
              );
          })}
          {resultFlag?'':<h4>No search results found</h4>}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default DashboardAdminSearch;
