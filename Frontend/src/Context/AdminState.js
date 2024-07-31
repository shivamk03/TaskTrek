import { useState } from "react";
import AdminContext from "./AdminContext";

const AdminState = (props) => {
  const team = [];
  const [state,setState] = useState(team);
  const [task, setTask] = useState({});
  var currentTeamMember ='';
  const getTeam = async () => {
    const url = `http://localhost:8080/admin/getTeam`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("Authorization"),
      },
    });
    let tasks= await response.json();
      setState(tasks);
      return tasks;
  };
  const changeTeamMember=(str)=>{
    currentTeamMember= str;
  }
  const getCurrentTeamMember=()=>{
    return currentTeamMember;
  }
  const addTeamMember=async(username,name,role)=>{
    const url = `http://localhost:8080/admin/add-member`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("Authorization"),
      },
      body: JSON.stringify({username:username,name:name, role:role})
    });
    let res= await response.json();
    return res;
  }
  
  const addTask=async(user, date, heading, description)=>{
    const url = `http://localhost:8080/admin/addTask/${user}/${date} 00:00:00`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("Authorization"),
      },
      body: JSON.stringify({heading:heading, description:description})
    });
    let res= await response.json();
    return res;
  }
  const getAllTask=async()=>{
    const url = `http://localhost:8080/admin/getTeamTasks`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("Authorization"),
      }
    });

    let res= await response.json();
    setTask(res);
    return res;
  }
  const deleteTask=async(id)=>{
    const url = `http://localhost:8080/admin/delete/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("Authorization"),
      }
    });

    let res= await response.json();
    console.log(res);
    await getAllTask();
    return res;
  }
  const removeMember=async(id)=>{
    const url = `http://localhost:8080/admin/delete/team/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("Authorization"),
      }
    });

    let res= await response.json();
    console.log(res);
    await getAllTask();
    return res;
  }
  
  return <AdminContext.Provider value={{state,getTeam,addTeamMember,addTask,getAllTask, task, changeTeamMember, getCurrentTeamMember, deleteTask, removeMember}}>{props.children}</AdminContext.Provider>;
};
export default AdminState;
