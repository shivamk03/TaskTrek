import React, { useEffect, useContext, useState } from "react";
import "./css/DashboardAdmin.css";
import SidebarAdmin from "./SidebarAdmin";
import { useNavigate } from "react-router-dom";
import AdminContext from "../Context/AdminContext";
import SmallBox from "./SmallBox";


const DashboardAdmin = (props) => {
    const navigate = useNavigate();
    const data = useContext(AdminContext);
    const { getAllTask, getCurrentTeamMember } = data;
    const [state, setState] = useState({});
    const [current, updateCurrent] = useState({curr:''});
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
    updateCurrent({curr:getCurrentTeamMember()})
  };
  return (
    <div className="dashboard">
      <SidebarAdmin />
      <div className="content">
      <div className="done">
        <h1>Team Member Tasks</h1>
        <h4>Member Id: {current.curr}</h4>
        <div className="all-container-detail">
          {Object.entries(state).map((t) => {
              return (
                  <div className="" key={t[0]}>
                {Object.entries(t[1]).map((e) => {
                    if(t[0]===current.curr)
                        return (
                    <>
                        <SmallBox
                          key={e[0]}
                          heading={e[1].heading}
                          description={e[1].description}
                          status={e[1].status}
                          comment={e[1].commet}
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
    </div>
  );
};

export default DashboardAdmin;
