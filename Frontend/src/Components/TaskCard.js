import React from 'react';
import { Link } from 'react-router-dom';
import './css/TaskCard.css';

export default function TaskCard(props) {

  return (
    <Link to='/dashteam/detail'>
        <div className='task-card'>
            <h4>{props.heading}</h4>
            <p>{props.end}</p>
        </div>
    </Link>
  )
}
