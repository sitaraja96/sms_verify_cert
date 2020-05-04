import React from 'react';
import { Route, Switch, withRouter, Router} from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import ProtectedRoute from './ProtectedRoute';
import Chat from '../Chat/Chat';

export default function Routes()
{
    return (
        <Switch>
            <ProtectedRoute path = '/chat' component = {withRouter(Chat)}/>
            <Route path = '/' exact component = {withRouter(SignUp)}/>
        </Switch>
    )
}