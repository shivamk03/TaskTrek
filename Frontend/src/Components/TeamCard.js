import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import './css/TaskCard.css';
import AdminContext from '../Context/AdminContext';
import { useNavigate } from 'react-router-dom';


export default function TeamCard(props) {
  const data = useContext(AdminContext);
  const {changeTeamMember, getCurrentTeamMember} = data;
  const navigate = useNavigate();
  
  const handleClick=(e)=>{
    e.preventDefault();
    changeTeamMember(props.username);
    navigate('/dashadmin/d');
    console.log(getCurrentTeamMember());
  }
  return (
    <Link to='/dashadmin/d' onClick={handleClick}>
        <div className='task-card'>
            <p className='para-team'><span>Name:</span> {props.name}</p>
            <p className='para-team'><span>Username/mail:</span> {props.username}</p>
            <p className='para-team'><span>Role:</span> {props.role}</p>
        </div>
    </Link>
  )
}
