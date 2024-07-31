import React, { useContext, useEffect, useState } from "react";
import AdminContext from "../Context/AdminContext";
import { useNavigate } from "react-router-dom";
import SmallBox from "./SmallBox";
import "./css/AllTask.css";

export default function AllTasks() {
  const navigate = useNavigate();
  const data = useContext(AdminContext);
  const { getAllTask } = data;
  const [state, setState] = useState({});
  useEffect(() => {
    if (!localStorage.getItem("Authorization")) {
      alert("Session Timeout");
      const timeout = setTimeout(() => navigate("/admin/login"), 0);
      return () => clearTimeout(timeout);
    }
    getTask();
  }, []);
  const getTask = async () => {
    let res = await getAllTask();
    setState(res);
    
  };
  return (
    <div className="content-all">
      <div className="done">
        <h1>Completed Tasks</h1>
        <div className="all-container">
          {Object.entries(state).map((t) => {
            return (
              <div className="smallbox-container" key={t[0]}>
                {Object.entries(t[1]).map((e) => {
                  if (e[1].status === "true")
                    return (
                      <>
                        <h4>Member Name : {t[0]}</h4>
                
                        <SmallBox
                          key={e[0]}
                          id={e[1].id}
                          name ={e[0].name}
                          heading={e[1].heading}
                          description={e[1].description}
                          status={e[1].status}
                          comment={e[1].taskComment}
                          complete = {e[1].complete}
                          end ={e[1].end}
                          start = {e[1].start}
                        />
                      </>
                    );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="notDone">
        <h1>Assigned Tasks</h1>
        <div className="all-container">
          {Object.entries(state).map((t) => {
            return (
              <div className="smallbox-container" key={t[0]}>
                {Object.entries(t[1]).map((e) => {
                  if (e[1].status === "false")
                    return (
                      <>
                        <h4>Member Name : {t[0]}</h4>
                        <SmallBox
                          key={e[0]}
                          id={e[1].id}
                          heading={e[1].heading}
                          description={e[1].description}
                          status={e[1].status}
                          comment={e[1].commet}
                          end ={e[1].end}
                          start = {e[1].start}
                        />
                      </>
                    );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
