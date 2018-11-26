import React, { useReducer, useEffect } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import Context from './context'
import MainApp from 'containers/MainApp'
import { Dimmer, Loader } from 'semantic-ui-react'

function reducer (state, action) {
  switch (action.type) {
    case 'repopulate': {
      return action.payload
    }
    case 'stopLoader': {
      return {
        ...state,
        loadingStore: false
      }
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

function App () {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    loadingStore: true
  })
  const { loadingStore } = state

  useEffect(() => {
    async function repopulateStore () {
      const store = await JSON.parse(localStorage.getItem('store'))
      if (store) {
        dispatch({ type: 'repopulate', payload: store })
      }
      dispatch({ type: 'stopLoader' })
    }
    repopulateStore()
  }, [])

  useEffect(() => {
    localStorage.setItem('store', JSON.stringify(state))
  })

  return (
    <Context.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        {loadingStore
          ? <Dimmer active inverted>
            <Loader size='large'>Loading</Loader>
          </Dimmer>
          : <Route path='/' component={MainApp} />}
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App
