import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loader: false,
    errorMsg: '',
};

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        showLoader: state => {
            state.loader = true;
        },
        hideLoader: state => {
            state.loader = false;
        },
    }
});

export const { showLoader, hideLoader } = commonSlice.actions;

export default commonSlice.reducer;