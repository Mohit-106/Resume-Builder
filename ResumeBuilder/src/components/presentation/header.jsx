import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../static/images/logo.png";
import { isLoaded,isEmpty } from "react-redux-firebase";
import * as authActions from '../../redux/actions/authActions'
import { connect } from "react-redux";

function LoggesOut(props) {
  return (
    <ul>
      <li className="signup clrBlur">
        <NavLink className=" btnv-1 clrBlur" to="/register">
        Register
        </NavLink>
      </li>
      <li className="signin clrBlur"> 
        <NavLink 
        className="text-blue btnv-3" to="/login">
        Sign In
        </NavLink>         
      </li>
    </ul>
  )
}

const Header = (props) => {
  const auth = props.auth;
  const handleLogOut=()=>{
    props.signOut();
   console.log('The user will sign out');
  }

  return (  
  <header className="header">
  <nav className="nav">
      <a href="/" className="holder-logo">
        <img className='logo' src={logo}></img>
      </a> 
        <div className="header-links full-height">

        { isLoaded(auth) && !isEmpty(auth) ?<>

          <ul>
            <li>
              <NavLink className="clrBlur" to="/">
               Logged in as {auth.email}
              </NavLink>
            </li>
            <li className="signin clrBlur"> 
              <button className="sout" onClick={handleLogOut}>
               Signout
              </button>         
            </li>
          </ul>

        </>:<LoggesOut></LoggesOut>}
          
          <ul id="nav-mid">
            <li>
            <NavLink className="btn-nvt-gm clrBlur" to="/resume-templates">
            Resume Templates
            </NavLink>
            </li>         
          </ul>
            
      </div>   
    </nav>
  </header>

  );
};

const mapStateToProps=(state)=>{
  return{
     auth: state.firebase.auth
  }
}
const mapDispatchToProps= (dispatch)=>{
  return {
   signOut:()=>dispatch(authActions.signout())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);
