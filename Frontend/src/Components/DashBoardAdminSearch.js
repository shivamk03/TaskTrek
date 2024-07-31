import React, { useEffect, useContext, useState } from "react";
import "./css/DashboardAdmin.css";
import SidebarAdmin from "./SidebarAdmin";
import { useNavigate } from "react-router-dom";
import AdminContext from "../Context/AdminContext";
import SmallBox from "./SmallBox";

const DashboardAdminSearch = (props) => {
  const navigate = useNavigate();
  const data = useContext(AdminContext);
  const { getTeam,getAllTask } = data;
  const role = props.role == null ? "" : props.role;
  const [currentSelection, setSelection] = useState({
    currentSelection: "startDate",
  });
  const [stateTask, setStateTask] = useState([]);
  const [state, setState] = useState({});
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
    setSelection({
      currentSelection: document.getElementById("criteria").value,
    });
  };
  const handleStartDate = (e) => {
    e.preventDefault();
    var date = document.getElementById('startDate').value;
    let temp=[];
    Object.entries(state).map((t)=>{
        Object.entries(t[1]).map(e=>{
            if((e[1].start).substring(0,10)===date){
                temp.push(t);
            }
        })
    });
    setStateTask(temp);
  };
  const handleEndDate = (e) => {
    e.preventDefault();
    var date = document.getElementById('endDate').value;
    let temp=[];
    Object.entries(state).map((t)=>{
        Object.entries(t[1]).map(e=>{
            if((e[1].end).substring(0,10)===date){
                temp.push(t);
            }
        })
    });
    setStateTask(temp);
  };
  const handleHeading = (e) => {
    e.preventDefault();
    var date = document.getElementById('heading').value;
    let temp=[];
    Object.entries(state).map((t)=>{
        Object.entries(t[1]).map(e=>{
            if((e[1].heading)===date){
                temp.push(t);
            }
        })
    });
    setStateTask(temp);};
  const handleComplete = () => {};
  const handlePending = () => {};
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
          <div className="all-container">
          {(stateTask).map((t) => {
              return (
                  <div className="smallbox-container" key={t[0]}>
                {Object.entries(t[1]).map((e) => {
                    if (e[1].status === "true")
                        return (
                    <>
                        <h4>Member Name : {t[0]}</h4>
                
                        <SmallBox
                          key={e[0]}
                          name ={e[0].name}
                          heading={e[1].heading}
                          description={e[1].description}
                          status={e[1].status}
                          comment={e[1].taskComment}
                          complete = {e[1].complete}
                          />
                      </>
                    );
                })}
              </div>
            );
        })}
        
        </div>
              <div>
      </div>
      
      </div>
      
    </div>
  );
};

export default DashboardAdminSearch;
