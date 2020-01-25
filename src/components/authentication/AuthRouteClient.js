import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import {USER_NAME_SESSION_ATTRIBUTE_ROLE} from '../authentication/AuthenticationService';

class AuthRouteClient extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE))

    }

    render() {
        if (sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE) === '[ROLE_Client]'
            || sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE) === '[ROLE_Admin]') {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/login" />
        }

    }
}

export default AuthRouteClient;
