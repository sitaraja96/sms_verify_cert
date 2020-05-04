import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
      render={props =>
        localStorage.getItem('Sign Up') ? <Component {...props} /> : <Redirect to='/' />
      }
      {...rest}
    />
)

export default ProtectedRoute