import React, { useContext, useEffect, useState } from 'react'
import AdminContext from '../Context/AdminContext'
import { useNavigate } from 'react-router-dom';
import SmallBox from './SmallBox';

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
        Object.entries(state).map(e=>{
          Object.entries(e[1]).map(t=>{
            console.log(t[1].id)
          })
        })
      }
     return (
    <div className="content">
      {Object.entries(state).map(t=>{
        return(<div className='' key ={t[0]}>
            <h4>{t[0]}</h4>
            {Object.entries(t[1]).map(e=>{
              return(<SmallBox key ={e[0]} heading = {e[1].heading} description = {e[1].description} status = {e[1].status} comment = {e[1].commet}/>);
            })}
        </div>)
      })}
    </div>
  )
}
