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
                    <img src={logo} className="App-logo" alt="logo"/>
                    O projekcie
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/data">
                        <Nav.Link>Dane</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/model">
                        <Nav.Link>Model</Nav.Link>
                    </LinkContainer>
                </Nav>
                <Navbar.Text>
                    Wykonał Andrzej Karolczak
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
}