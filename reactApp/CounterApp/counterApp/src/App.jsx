import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Extra from './Component/Extra/Extra'

function App() {
  const [count, setCount] = useState(0)
  const[costumvalue, setCostumValue] = useState(0)

  const handelIncrement = () => {
    setCount(count + 1)
  }

  const handelDecrement = () => {
    setCount(count - 1)
  }

  const handelReset = () => {
    setCount(0)
  }

  const handelcostumIncrement = () => {
    setCount(count + costumvalue)
  }

  const handelcostumDecrement = () => {
    setCount(count - costumvalue)
  }



  return (
    <>
      <div>
        <input type ="number" placeholder="Type something..." value={costumvalue} onChange={(e) => setCostumValue(Number(e.target.value))} />
        <h1>Counter: {count}</h1>
        <button onClick={handelIncrement}>Increment</button>
        <button onClick={handelDecrement}>Decrement</button>
        <button onClick={handelReset}>Reset</button>
        <button onClick={() => handelcostumIncrement(costumvalue)}>Costum Increment</button>
        <button onClick={() => handelcostumDecrement(costumvalue)}>Costum Decrement</button>
      </div>
      <Extra costumValue={costumvalue} count={count}  />
      
    </>
  )
}

export default App
