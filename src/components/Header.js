import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import logo from '../logo.svg';
import '../App.css';

export default function Header() {
    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <LinkContainer to="/">
                <Navbar.Brand>
                    <img src={logo} className="App-logo" alt="logo" />
                    React-Bootstrap
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/about">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/model">
                        <Nav.Link>Model</Nav.Link>
                    </LinkContainer>
                </Nav>
                {/*<Form inline>*/}
                {/*    <FormControl type="text" placeholder="Search" className="mr-sm-2" />*/}
                {/*    <Button variant="outline-success">Search</Button>*/}
                {/*</Form>*/}
                <Navbar.Text>
                    Wykonał Andrzej Karolczak
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
}