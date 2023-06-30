// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {
  PokemonDataView,
  PokemonForm,
  PokemonInfoFallback,
  fetchPokemon,
} from '../pokemon'

// class ErrorBoundary extends React.Component {
//   state = {error: null}

//   static getDerivedStateFromError(error) {
//     return {error}
//   }

//   render() {
//     const {error} = this.state
//     console.log('Error boundary', error)
//     if (error) {
//       return <this.props.fallback error={error} />
//     }
//     return this.props.children
//   }
// }

function pokemonInfoReducer(state, action) {
  switch (action.type) {
    case 'start':
      return {
        ...state,
        status: 'pending',
      }
    case 'success':
      return {
        ...state,
        status: 'resolved',
        pokemon: action.pokemon,
      }
    case 'error':
      return {
        ...state,
        status: 'rejected',
        error: action.error,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

function PokemonInfo({pokemonName}) {
  // check lection to see difference between putting in state
  const [state, dispatch] = React.useReducer(pokemonInfoReducer, {
    status: pokemonName ? 'pending' : 'idle',
    error: null,
    pokemon: null,
  })
  const {status, error, pokemon} = state

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    dispatch({type: 'start'})
    fetchPokemon(pokemonName, 1000).then(
      pokemon => dispatch({type: 'success', pokemon}),
      error => dispatch({type: 'error', error}),
    )
  }, [pokemonName])

  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    throw error
  } else {
    return <PokemonDataView pokemon={pokemon} />
  }
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={handleReset}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
