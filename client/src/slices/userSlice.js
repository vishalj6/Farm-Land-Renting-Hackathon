import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserDataApi } from '../services/apiCalls.js';

export const fetchUser = createAsyncThunk('user/fetchUser', async (token, { rejectWithValue }) => {
    try {
        const userData = await fetchUserDataApi(token);
        return userData;
    } catch (error) {
        return rejectWithValue(error.message || 'Failed to fetch user data');
    }
});

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch user data';
            });
    }
});

export default userSlice.reducer;
