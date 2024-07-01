import { useState } from "react";
import AdminContext from "./AdminContext";

const AdminState = (props) => {
  const team = [];
  const [state,setState] = useState(team);
  const [task, setTask] = useState({});
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
  const addTeamMember=async(username)=>{
    const url = `http://localhost:8080/admin/add-member`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("Authorization"),
      },
      body: JSON.stringify({username:username})
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
  return <AdminContext.Provider value={{state,getTeam,addTeamMember,addTask,getAllTask, task}}>{props.children}</AdminContext.Provider>;
};
export default AdminState;
