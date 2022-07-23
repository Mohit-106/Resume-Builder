import React from 'react';
import logo from "../../static/images/resume.png";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

const Lp = () => {
    return (    
    
        <div className="container  lp-page center">          
        <div className="section">
         <h1>Create a resume that stands out</h1>
           <p >Create a resume that perfectly describes your skills and job profile.</p>
            <br></br>
           <div >
           <Button variant="outlined"> <NavLink to="/getting-started"  style={{textDecoration:"none"}}><span className="clrBlur">Get Started for Free</span>
                </NavLink></Button>
                </div>
                <img  style={{marginTop:"6rem"}} src={logo}   className="lp-resume" alt="logo" />
         </div>        
         </div>
    
        );
}
 
export default Lp;