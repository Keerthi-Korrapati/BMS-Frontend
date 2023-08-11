import React, { Component } from "react";
import { Link } from "react-router-dom";
//import Home from "./FrontPages/Home";
import "./Navbar.css";
class Navbar extends Component {
    render(){
        return(
            <div>
              <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                  Book Management System
                </Link>
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/Booklogin"} className="btn btn-outline-light ms-2">
                      Login
                    </Link>
                  </li> 
                  <li className="nav-item">
                    <Link to={"/BookRegister"} className="btn btn-outline-light ms-2">
                      Register
                    </Link>
                  </li> 
                </div>
              </nav>
            </div>
        )
    }
}
export default Navbar