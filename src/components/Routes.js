import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
import NotFound from './NotFound/NotFound';

export default () =>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
    </Switch>