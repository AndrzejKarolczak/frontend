import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Data from "./Data";
import Header from './components/Header'
import NotFound from "./components/NotFound";
import OptionsForm from "./components/OptionsForm";


ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Header/>
            <Switch>
                <Route path="/data" component={Data}/>
                <Route path="/model" component={OptionsForm}/>
                <Route exact path="/" component={About}/>
                <Route component={NotFound} />
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

function About() {
    return (<h2>O projekcie</h2>);
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
