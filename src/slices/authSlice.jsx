import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: 0,
    value: 0,
};

const authSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: state => {
            state.value += 1;
            state.token = state.value;
        },
        decrement: state => {
            state.value -= 1;
            state.token = null;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        }
    }
});

export const { increment, decrement, incrementByAmount } = authSlice.actions;

export default authSlice.reducer;
