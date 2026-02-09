import React from 'react'  
import { useState } from 'react'


const Footer = () => {
  const [count, setCount] = useState(0);

  const handelIncreament = () => {
    setCount(count + 1);
  }
  const handelDecreament = () => {
    setCount(count - 1);
  }
  const handelReset = () => {
    setCount(0);
  }
  
  return (
    <div className="bg-gray-800 text-white p-4 text-center">
      <button onClick={handelIncreament} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
        Increment
      </button>
      <button onClick={handelDecreament} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
        Decrement
      </button>
      <button onClick={handelReset} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
        Reset
      </button>
      <p className="mt-2">Count: {count}</p>
    </div>
  )
}

export default Footer

