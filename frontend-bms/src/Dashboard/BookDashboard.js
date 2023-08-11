import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import authService from "../services/auth.service";
import eventBus from "../common/EventBus";
import "../Navbar.css";

class BookDashboard extends Component {
constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = authService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        
      });
    }
    
    eventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    eventBus.remove("logout");
  }

  logOut() {
    authService.logout();
    this.setState({
   
      currentUser: undefined,
    });
  }

  render() {

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">

          <Link to={"/"} className="navbar-brand">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtZ2tPyVKC16nh0fUnJNJXT8IiGqso7pCd5w&usqp=CAU" 
            alt="logo" className="book-logo"/>
          </Link>
        
          <Link to={"/FeaturedBooks"} className="navbar-brand1">
              Featured Books
          </Link>
          
          <Link to="/add-book" className="navbar-brand1">
              Add Book
          </Link>
          
          <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <a href="/" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
            </nav>
         </div>
    );
          }
        }
export default BookDashboard