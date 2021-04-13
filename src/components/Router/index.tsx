import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Login from "../Login/Login";
import HomePage from "../HomePage/HomePage"

class CustomRoute extends Component {
    render() {
        return (
            <div>
                <Router basename="/csvfetch">
                    <Switch>
                        <PrivateRoute path="/home" component={HomePage} />
                        <PrivateRoute path="/" component={Login} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default CustomRoute;

