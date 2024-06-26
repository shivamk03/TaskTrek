import React, { useEffect,useContext } from 'react';
import './css/DashboardAdmin.css';
import SidebarAdmin from './SidebarAdmin';
import TeamCard from './TeamCard'
import TeamDetail from './TeamDetail';
import { useNavigate } from 'react-router-dom';
import AdminContext from '../Context/AdminContext';

const DashboardAdmin = (props) => {
  const navigate = useNavigate();
  const data = useContext(AdminContext);
  const {state,getTeam} = data;
  useEffect(() => {
    if (!localStorage.getItem("Authorization")) {
      alert("Session Timeout");
      const timeout = setTimeout(() => navigate("/admin/login"),0);
      return () => clearTimeout(timeout);
    }
    getTeam();
  },[]);
  return (
    <div className="dashboard">
      <SidebarAdmin />
      {props.details==="true"?<TeamDetail/>:<div className="content">
        <div className="card-admin">
          <h1>Tech Mahindra</h1>
        </div>
        <h2>The Team</h2>
        {state.map((team =>{
            return(<TeamCard key = {team.id} username={team.username} />);
        }))}
        
      </div>}
      
    </div>
  );
};

export default DashboardAdmin;
