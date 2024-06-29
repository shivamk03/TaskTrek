import React from 'react'
import logo from '../imageComponents/logo.svg';
import {Link} from 'react-router-dom';
import './css/Navbar.css'
export default function Navbar() {
  const handleSignOut = ()=>{
    localStorage.removeItem("logged");
    console.log("removed succesfully");
  }
  return (
    <div className='nav'>
      <div className="logo-container">
        <img src={logo} className="logo" alt="" />
      </div>
      <div className="nav-list">
        <ul>
            <li><Link to ='/about' className='nav-list-items'>Why TaskTrek</Link></li>
            <li><Link to ='/' className='nav-list-items'>Home</Link></li>
            <li><Link to ='/dashteam' className='nav-list-items'>DashBoard</Link></li>
            <li><Link to ='/contact' className='nav-list-items'>Contact Us</Link></li>
        </ul>
      </div>
      <div className="nav-auth">
        <ul>
            {(!localStorage.getItem("logged"))?<li><Link to ='/login/handler' id='nav-auth-btn'>Sign in</Link></li>:<li><Link to ='/' id='nav-auth-btn' onClick={handleSignOut}>Sign out</Link></li>}
        </ul>
      </div>
    </div>
  )
}
