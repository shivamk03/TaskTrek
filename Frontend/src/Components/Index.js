import React from "react";
import {Link} from 'react-router-dom';
import "./css/index.css";
export default function Index() {
  return (
    <>
      <div className="index-page-div">
        <div className="left-content">
          <h1>Customize how your team’s work flows</h1>
          <p>
            Simplify life for both you and your team. The world’s #1 task
            manager and to-do list app.
          </p>
          <Link to ='/signup/admin' className='sign-in'>Get Started</Link>
        </div>
        <div className="right-content">
          <img
            src={require("../imageComponents/desktop_picture.png")}
            className="desk-img"
            alt="unavailable"
          />
        </div>
      </div>
      <div className="index-page-div-2">
        <div className="upper-container">
          <h1>It’s Time to Get Organized.</h1>
          <p>
            Task management serves as the crucial bridge that connects the
            initial planning phase to the final execution. The ideal task
            management software should offer a comprehensive view of ongoing
            work, facilitating seamless tracking from inception to fruition.
            Discover the power of MeisterTask: Embrace the digital
            transformation along with numerous teams globally who utilize our
            Kanban-inspired project boards to streamline workflows and maintain
            a transparent view of task advancement. Let’s embark on this journey
            of organization together!”
          </p>
        </div>
        <div className="lower-container">
          <img
            src={require("../imageComponents/desktop_picture-2.png")}
            className="desk-img"
            alt="unavailable"
          />
        </div>
      </div>
    </>
  );
}
