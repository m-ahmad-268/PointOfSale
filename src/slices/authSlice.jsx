import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: '',
    userDetail: null,
};

const authSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        reestData: state => {
            state.token = '';
            state.userDetail = null;
        },
        setUserData: (state, action) => {
            state.userDetail = { ...action.payload };
            state.token = action.payload.token;
        }
    }
});

export const { reestData, setUserData } = authSlice.actions;

export default authSlice.reducer;
