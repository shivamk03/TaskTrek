import { useState } from "react";
import TeamMemberContext from "./TeamMemberContext";

const TeamMemberState = (props) => {
  const [company, setCompany] = useState({ company: "" });
  const [currentTask, setTask] = useState({ currentTask: "" });
  const [state, setState] = useState([]);
  const fetchAllTasks = async () => {
    try {
      const url = `http://localhost:8080/team/fetchAll`;
      const user = localStorage.getItem("team-user");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user }),
      });
      let tasks = await response.json();
      setState(tasks);
      return tasks;
    } catch (e) {
      console.log(e);
    }
  };
  const fetchCompany = async () => {
    try {
      const url = `http://localhost:8080/team/fetchCompany`;
      const user = localStorage.getItem("team-user");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user }),
      });
      let n_company = await response.json();
      setCompany(n_company);
      return company;
    } catch (e) {
      console.log(e);
    }
  };
  const updateComment = async (id, comment) => {
    try {
      await updateStatus(id);
      const url = `http://localhost:8080/task/update-comment/${id}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskComment: comment }),
      });
      const res = response.json();
      fetchAllTasks();
      return res;
    } catch (e) {
      console.log(e);
    }
  };
  const updateStatus = async (id) => {
    try {
      const url = `http://localhost:8080/task/update-status/${id}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: true }),
      });
    } catch (e) {
      console.log(e);
    }
  };
  const updateTask = (str) => {
    setTask(str);
  };
  return (
    <TeamMemberContext.Provider
      value={{
        state,
        fetchAllTasks,
        updateComment,
        fetchCompany,
        company,
        updateTask,
        currentTask,
      }}
    >
      {props.children}
    </TeamMemberContext.Provider>
  );
};
export default TeamMemberState;
