import React from 'react';
import { Link } from 'react-router-dom';
import './css/TaskCard.css';

export default function TeamCard(props) {

  return (
    <Link to='/dashadmin/d'>
        <div className='task-card'>
            <h4>{props.username}</h4>
        </div>
    </Link>
  )
}
