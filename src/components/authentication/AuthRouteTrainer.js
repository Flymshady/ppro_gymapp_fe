import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import {USER_NAME_SESSION_ATTRIBUTE_ROLE} from '../authentication/AuthenticationService';

class AuthRouteTrainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE))

    }

    render() {
        if (sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE) === 'Trainer'
            || sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ROLE) === 'Admin') {
            return <Route {...this.props} />
        } else {
            return <Redirect to={{pathname: '/login', message: 'K pokračování nemáte potřebná oprávnění'}} />
        }

    }
}

export default AuthRouteTrainer;
