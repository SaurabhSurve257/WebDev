import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
    <h1> NOTES </h1>
    <input type='text' ></input>
    
    <button type="submit">ADD</button>
    </div>
    

    </>
  )
}

export default App
