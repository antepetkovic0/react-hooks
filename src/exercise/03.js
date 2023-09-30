// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name() {
  const [name, setName] = React.useState('')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={e => setName(e.target.value)} />
    </div>
  )
}

function FavoriteAnimal({animal, onChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input id="animal" value={animal} onChange={onChange} />
    </div>
  )
}

function Display({animal}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

function App() {
  const [animal, setAnimal] = React.useState('')

  return (
    <form>
      <Name />
      <FavoriteAnimal
        animal={animal}
        onChange={e => setAnimal(e.target.value)}
      />
      <Display animal={animal} />
    </form>
  )
}

export default App
