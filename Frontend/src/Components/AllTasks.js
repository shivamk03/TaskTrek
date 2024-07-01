import React, { useContext, useEffect, useState } from 'react'
import AdminContext from '../Context/AdminContext'
import { useNavigate } from 'react-router-dom';

export default function AllTasks() {
    const navigate = useNavigate();
    const data = useContext(AdminContext);
    const {getAllTask} = data;
    const [state,setState] = useState({});
    useEffect(() => {
        if (!localStorage.getItem("Authorization")) {
          alert("Session Timeout");
          const timeout = setTimeout(() => navigate("/admin/login"),0);
          return () => clearTimeout(timeout);
        }
        getTask();
      },[]);
      const getTask=async()=>{
        let res = await getAllTask();
        setState(res);
        console.log(state);
      }
     return (
    <div className="content">
      {Object.entries(state).map(t=>{
        return(<div className='task-card'>
            <h4>{t[0]}</h4>
            <p>{t[1]}</p>
        </div>)
      })}
    </div>
  )
}
