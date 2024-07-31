import React, { useEffect, useContext, useState } from "react";
import "./css/DashboardAdmin.css";
import SidebarAdmin from "./SidebarAdmin";
import { useNavigate } from "react-router-dom";
import AdminContext from "../Context/AdminContext";
import SmallBox from "./SmallBox";


const DashboardAdmin = (props) => {
    const navigate = useNavigate();
    const data = useContext(AdminContext);
    const { state, getAllTask, getCurrentTeamMember , removeMember} = data;
    const [stateTemp, setState] = useState({});
    const [current, updateCurrent] = useState({curr:''});
    const [pending, setPending] = useState({val:true});
    const [complete, setComplete] = useState({val:true});
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

  const handleRemoveTeamMember=async(e)=>{
    e.preventDefault();
    if(window.confirm("Are you sure you want to delete member: "+current.curr)==true){
      let id =''
      state.map(team=>{
        if(team.username===current.curr)
          id = team.id;
      })
      await removeMember(id);
      alert("Deleted Successfully");
    }
    navigate('/dashadmin');
  }
  return (
    <div className="dashboard">
      <SidebarAdmin />
      <div className="content">
      <div className="done">
        <h1>Team Member Tasks</h1>
        <div className="member-container">
        <h4>Member Id: {current.curr}</h4>
        <button onClick={handleRemoveTeamMember} className="deleteTask">Remove Member</button>
        </div>
        <div className="all-container-detail">
          <h4 className="heading">Completed Tasks</h4>
          {Object.entries(stateTemp).map((t) => {
              return (
                <div className="" key={t[0]}>
                {Object.entries(t[1]).map((e) => {
                    if(t[0]===current.curr && e[1].status==="true"){
                      if(complete.val==true){
                        setComplete(false);
                      }
                        return (
                    <>
                        <SmallBox
                          key={e[0]}
                          heading={e[1].heading}
                          description={e[1].description}
                          status={e[1].status}
                          comment={e[1].taskComment}
                          complete = {e[1].complete}
                        />
                      </>
                    );}
                })}
              </div>
            );
          })}
          {complete.val==true?<h4>No Tasks</h4>:''}
        </div>
        <div className="all-container-detail">
        <h4 className="heading-p">Pending Tasks</h4>
          {Object.entries(stateTemp).map((t) => {
              return (
                  <div className="" key={t[0]}>
                {Object.entries(t[1]).map((e) => {
                    if(t[0]===current.curr && e[1].status==='false'){
                      if(pending.val==true){
                        setPending(false);
                      }
                        return (
                    <>
                        <SmallBox
                          key={e[0]}
                          heading={e[1].heading}
                          description={e[1].description}
                          status={e[1].status}
                          comment={e[1].taskComment}
                          complete = {e[1].complete}
                        />
                      </>
                    );}
                })}
              </div>
            );
          })}
          {pending.val==true?<h4>No Tasks</h4>:''}
        </div>
      </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
