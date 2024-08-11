import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slices/authSlice';
import userSlice from '../slices/userSlice';
import landSlice from '../slices/landSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        land: landSlice,
    },
});

export default store;
