import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav} from "react-bootstrap";
import './App.css';
import Routes from './components/Routes';

class App extends Component {

  render() {
    return (
      <div className="App container">
        <Navbar collapseOnSelect>
          <Navbar.Brand>
            <Link to="/" className="navbar-brand">Blog API</Link>
          </Navbar.Brand>
          <Navbar.Collapse>
            <Nav className="justify-content-end">
              <Link to="/register" className="nav-link">Register</Link>
              <Link to="/login" className="nav-link">Login</Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes></Routes>
      </div>
    );
  }
}

export default App;
