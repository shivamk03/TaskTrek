import React from 'react'
import loading from "../imageComponents/Spinner.gif";
import "./css/Spinner.css";
export default function Spinner(){
        return(<div className='rootLoader'>
            <img  className="SpinnerImg" src={loading} alt="Loading" />
        </div> 
        );
}