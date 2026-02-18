import React, {useState} from 'react'
import {useSelector, useDispatch } from 'react-redux'
import { increament, decreament, reset, setState } from './counterSlice'

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();   

  return (
    <div>
        <div>
            <h2>{count}</h2>

        </div>
        <input type="number" value={useSelector((state)=>state.counter.step)} onChange={(e)=>dispatch(setState(Number(e.target.value)))} /> 
        <button onClick={()=>dispatch(increament())}>increament</button>
        <button onClick={()=>dispatch(decreament())}>decreament</button>
        <button onClick={()=>dispatch(reset())}>reset</button>

    </div>
  )
}

export default Counter