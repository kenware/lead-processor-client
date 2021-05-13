import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../store/user/actions'

// eslint-disable-next-line react/prop-types
const BaseRoute = ({ component: Component, ...restOfProps }) => {
  const dispatch = useDispatch()
  let { user } = useSelector(state => state.user)
  if (!user) {
    user = localStorage.getItem('user')
    user = user ? JSON.parse(user) : user
    if (user) dispatch(setUser(user))
  }

  const userRedirect = user?.isAdmin ? '/admin' : '/dashboard'

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        user
          ? (restOfProps.auth
              ? <Redirect to={userRedirect} />
              : <Component {...props} />)
          : (restOfProps.auth ? <Component {...props} /> : <Redirect to='/login' />)
      }
    />
  )
}
BaseRoute.prototypes = {
  component: PropTypes.func.isRequired
}
export default BaseRoute
