import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Register from './routes/Register'

function MainApp ({ match }) {
  return (
    <div className='app-container'>
      {/* sidebar */}
      <div className='app-main-container'>
        {/* header */}
        <div className='app-main-content'>
          <Switch>
            <Route exact path={`/register`} component={Register} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default MainApp
