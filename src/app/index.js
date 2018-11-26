import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from '../components/Header'

function index ({ match }) {
  return (
    <div className='app-container'>
      {/* sidebar */}
      <div className='app-main-container'>
        <Header />
        <div className='app-main-content'>
          {/* <Switch /> */}
        </div>
      </div>
    </div>
  )
}

export default index
