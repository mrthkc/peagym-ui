import React, { Component } from "react";
import { Switch, Route, BrowserRouter, } from "react-router-dom";

import AuthService from "./services/auth.service";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import SplitButton from 'react-bootstrap/SplitButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";

class App extends Component {
    constructor(props) {
        super(props);
        
        this.logOut = this.logOut.bind(this);
        this.state = {
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
            });
        }
    }

    logOut() {
        AuthService.logout();
        this.setState({
            currentUser: undefined,
        });
    }

    render() {
        const { currentUser } = this.state;
        return (
            <BrowserRouter>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">PeaGym</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    {currentUser && (
                        <>
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav>
                        <SplitButton 
                            navbar
                            title={currentUser.uemail}
                            href={"/profile/" + currentUser.uid}
                            variant="primary"
                            className="justify-content-end"
                            id="user-nav-dropdown"
                        >
                            <Dropdown.Item href={"/profile/" + currentUser.uid}>Profile</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="/login" onClick={this.logOut}>Logout</Dropdown.Item>
                        </SplitButton>
                        </>
                    )}

                    {!currentUser && (
                        <Nav className="ml-auto">
                            <Button variant="primary" href="/login">Login</Button>
                            <Button className="ml-1" variant="info" href="/register">Register</Button>
                        </Nav>
                    )}
                        
                    </Navbar.Collapse>
                </Navbar>

                <Switch>
                    <Route exact path={["/", "/home"]} component={Home} />
                    <Route path={["/profile/:uid"]} component={Profile} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;