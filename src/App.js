import React, { Component, Fragment } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Navbar, Nav, NavItem} from "react-bootstrap";
import './App.css';
import Routes from './components/Routes';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAuthenticated: false,
            isAuthenticating: true
        }
    }

    userHasAuthenticated = authenticated => {
        this.setState({ isAuthenticated: authenticated });
    }

    handledLogout = event => {
       this.userHasAuthenticated(false);
       localStorage.clear();
       this.props.history.push("/login");
    }

    componentDidMount() {
        try {
            this.currentSession()
            this.userHasAuthenticated(true)
        }catch (e) {
            if(e !== 'No current User'){
                console.log(e)
            }
        }
        this.setState({isAuthenticating: false})
    }

    currentSession = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        if(user != null) console.log(user.token)
        if(user == null) throw this.Exception("No current user")
    }

    Exception(message) {
        this.toString = function() {
            return message
        }
    }

    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated
        }
        return (
            !this.state.isAuthenticating &&
            <div className="App container">
                <Navbar collapseOnSelect>
                    <Navbar.Brand>
                        <Link to="/" className="navbar-brand">Blog API</Link>
                    </Navbar.Brand>
                    <Navbar.Collapse>
                        <Nav className="justify-content-end">
                            {
                                this.state.isAuthenticated?
                                    <NavItem onClick={this.handledLogout}>Logout</NavItem>
                                    :
                                    <Fragment>
                                        <Link to="/register" className="nav-link">Register</Link>
                                        <Link to="/login" className="nav-link">Login</Link>
                                    </Fragment>

                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Routes childProps={childProps}></Routes>
            </div>
        );
    }
}

export default withRouter(App);
