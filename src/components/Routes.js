import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home/Home';
import Post from './Post/Post';
import PostEdit from './Post/PostEdit';
import Login from './Login/Login';
import NotFound from './NotFound/NotFound';
import AppliedRoute from '../components/AppliedRoute';

export default ({childProps}) =>
    <Switch>
        <AppliedRoute exact path="/" component={Home} props={childProps} />
        <AppliedRoute exact path="/login" component={Login} props={childProps} />
        <AppliedRoute exact path="/posts" component={Post} props={childProps} />
        <AppliedRoute exact path="/posts/:id/edit" component={PostEdit} props={childProps} />
        <Route component={NotFound} />
    </Switch>