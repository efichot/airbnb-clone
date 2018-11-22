import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import MainApp from './app/MainApp'

const App = () => (
  <BrowserRouter>
    <Route path='/' component={MainApp} />
  </BrowserRouter>
)

export default App
