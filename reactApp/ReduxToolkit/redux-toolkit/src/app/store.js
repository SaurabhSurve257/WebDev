import {configureStore} from '@reduxjs/toolkit';
//import counter reducer
import counterReducer from '../Feature/counter/counterSlice';

export const store=configureStore({
    reducer:{
        counter:counterReducer,
    }
})

