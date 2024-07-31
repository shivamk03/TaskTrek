import { useState } from "react";
import AdminContext from "./AdminContext";

const AdminState = (props) => {
  const team = [];
  const [state, setState] = useState(team);
  const [task, setTask] = useState({});
  var currentTeamMember = "";
  const getTeam = async () => {
    try {
      const url = `http://localhost:8080/admin/getTeam`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorization"),
        },
      });
      let tasks = await response.json();
      setState(tasks);
      return tasks;
    } catch (e) {
      console.log(e);
    }
  };
  const changeTeamMember = (str) => {
    currentTeamMember = str;
  };
  const getCurrentTeamMember = () => {
    return currentTeamMember;
  };
  const addTeamMember = async (username, name, role) => {
    try {
      const url = `http://localhost:8080/admin/add-member`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorization"),
        },
        body: JSON.stringify({ username: username, name: name, role: role }),
      });
      let res = await response.json();
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  const addTask = async (user, date, heading, description) => {
    try {
      const url = `http://localhost:8080/admin/addTask/${user}/${date}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorization"),
        },
        body: JSON.stringify({ heading: heading, description: description }),
      });
      let res = await response.json();
      return res;
    } catch (e) {
      console.log(e);
    }
  };
  const getAllTask = async () => {
    try {
      const url = `http://localhost:8080/admin/getTeamTasks`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorization"),
        },
      });

      let res = await response.json();
      setTask(res);
      return res;
    } catch (e) {
      console.log(e);
    }
  };
  const deleteTask = async (id) => {
    try {
      const url = `http://localhost:8080/admin/delete/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorization"),
        },
      });

      let res = await response.json();
      console.log(res);
      await getAllTask();
      return res;
    } catch (e) {
      console.log(e);
    }
  };
  const removeMember = async (id) => {
    try {
      const url = `http://localhost:8080/admin/delete/team/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorization"),
        },
      });

      let res = await response.json();
      console.log(res);
      await getAllTask();
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        state,
        getTeam,
        addTeamMember,
        addTask,
        getAllTask,
        task,
        changeTeamMember,
        getCurrentTeamMember,
        deleteTask,
        removeMember,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};
export default AdminState;
