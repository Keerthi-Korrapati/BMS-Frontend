import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Booklogin from "./components/BookLogin";
import Bookregister from "./components/BookRegister";
import Navbar from "./Navbar";

import ListBookComponent from "./components/ListBookComponent";
import AddBookComponent from "./components/AddBookComponent";
import BookDashboard from "./Dashboard/BookDashboard";
import Home from "./FrontPages/Home";
import FeaturedBooks from "./components/FeaturedBooks";

class App extends Component {
  render(){
    return(
      <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path="/navbar" component={Navbar} />
            <Route exact path="/BookDashboard" component={BookDashboard} />
            <Route exact path={ "/Booklogin"} component={Booklogin} />
            <Route exact path="/BookRegister" component={Bookregister} />
            <Route exact path="/featuredBooks" component={FeaturedBooks} />
            <Route exact path="/ListBookComponent" component={ListBookComponent} />
            <Route path="/add-Book" component={AddBookComponent} />
            <Route path="/update/:id" component={AddBookComponent} />

            
          
          </Switch>
      </Router>
 
  
    )
  }
}

export default App;
