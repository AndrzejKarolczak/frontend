
import './App.css';
import QuotesTable from "./components/QuotesTable";
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Data from "./Data";
import {Navbar} from "react-bootstrap";

export default function App() {
    return (
        <Router>
            <header className="App-header">

                    {/*<nav className="navbar navbar-expand-md navbar-dark">*/}
                    {/*    <img src={logo} className="App-logo" alt="logo" />*/}
                    {/*    <ul className="navbar-nav">*/}
                    {/*        <li>*/}
                    {/*            <Link to="/">Home |</Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link to="/about"> About |</Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link to="/users"> Users</Link>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</nav>*/}






            </header>

        </Router>
    );
}
