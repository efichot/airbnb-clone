import React, { useReducer, useEffect } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import Context from './context'
import MainApp from 'containers/MainApp'

function reducer (state, action) {
  switch (action.type) {
    case 'repopulate': {
      return action.payload
    }
    case 'signin': {
      return {
        ...state,
        user: action.payload
      }
    }
    case 'logout': {
      return {
        ...state,
        user: null
      }
    }
    default:
      return state
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, { user: null })

  useEffect(() => {
    async function repopulateStore () {
      const store = await JSON.parse(localStorage.getItem('store'))
      if (store) {
        dispatch({ type: 'repopulate', payload: store })
      }
    }
    repopulateStore()
  }, [])

  useEffect(() => {
    localStorage.setItem('store', JSON.stringify(state))
  })

  return (
    <Context.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Route path='/' component={MainApp} />
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App
