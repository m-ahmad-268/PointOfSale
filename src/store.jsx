import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import commonReducer from './slices/commonSlice';
import { loadFromLocalStorage, saveToLocalStorage } from './slices/localStorage';

const Store = configureStore({
    reducer: {
        counter: authReducer,
        common: commonReducer
    },
    preloadedState: loadFromLocalStorage()
});


// Subscribe to store changes and persist
Store.subscribe(() => {
    const state = Store.getState();

    // ✅ Auto-calls whenever state changes
    console.log("🔄 State changed:", state);
    saveToLocalStorage({
        counter: Store.getState().counter, // selectively persist
    });
});


export default Store;
