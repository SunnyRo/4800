import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import AuthenticationService from './Authentication'
const PrivateRoute = ({ component: Component, ...rest }) => {

    // Add your own authentication on the below line.
    const user = AuthenticationService.getCurrentUser();

    return (
        <Route
            {...rest}
            render={props =>
                user ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                )
            }
        />
    )
}

export default PrivateRoute