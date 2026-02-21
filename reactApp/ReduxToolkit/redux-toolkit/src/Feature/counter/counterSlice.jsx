import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : 0,
    step : 1,

};


const counterSlice = createSlice({
    name : 'counter',
    initialState,
    reducers : {
        incremenet : (state) => {
            state.value += state.step;
        },
        decrement : (state) => {
            state.value -= state.step;
        },
        reset : (state) => {
            state.value = 0;
            state.customVal = 0;
        },
        setState : (state, action) => {
            state.step = action.payload;
        },

    }
})

export const {
    incremenet,
    decrement,
    reset,
    setState,
} = counterSlice.actions;


export default counterSlice.reducer;