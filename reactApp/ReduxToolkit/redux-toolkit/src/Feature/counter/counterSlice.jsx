import {createSlice} from '@reduxjs/toolkit';

const initialState={
    value:0,
    step:1,
};

const counterSlice=createSlice({
    name : 'counter',
    initialState,
    reducers:{
        increament:(state)=>{
            step.value+=state.step;
    },
        decreament:(state)=>{
            step.value-=state.step;
    },
        reset :(state)=>{
            step.value=0;
  },
        setState:(state,action)=>{
            state.step=action.payload;
        },
}
});

export const{
    increament,
    decreament,
    reset,
    setState,
}=counterSlice.actions;

export default counterSlice.reducer;