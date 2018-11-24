import React, { useEffect, useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { auth } from 'helpers/firebase'
import Context from '../context'
import App from 'app/index'
import SignUp from 'containers/SignUp'
import SignIn from 'containers/SignIn'

const RestrictedRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (user ? <Component {...props} /> : <Redirect to={'/signIn'} />)}
  />
)

export default function app () {
  const { state, dispatch } = useContext(Context)
  const { user } = state

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('User sign in')
        dispatch({ type: 'signin', payload: user })
      } else {
        console.log('User not sign in')
        dispatch({ type: 'logout' })
      }
    })
  }, [])

  return (
    <Switch>
      <RestrictedRoute path='/app' user={user} component={App} />
      <Route exact path='/signUp' component={SignUp} />
      <Route exact path='/signIn' component={SignIn} />
    </Switch>
  )
}
