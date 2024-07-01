import { useState } from "react";
import TeamMemberContext from "./TeamMemberContext";

const TeamMemberState = (props) => {
  const tasks =[];
  const [state,setState] = useState(tasks);
  const fetchAllTasks = async () => {
    const url = `http://localhost:8080/team/fetchAll`;
    const user = localStorage.getItem("team-user");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },body: JSON.stringify({username:user})
    });
    let tasks= await response.json();
      setState(tasks);
      return tasks;
  };
  return <TeamMemberContext.Provider value={{state,fetchAllTasks}}>{props.children}</TeamMemberContext.Provider>;
};
export default TeamMemberState;
