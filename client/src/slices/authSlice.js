import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserApi, registerUserApi } from '../services/apiCalls.js';

export const loginUser = createAsyncThunk('auth/loginUser', async (formData, { rejectWithValue }) => {
    try {
        const data = await loginUserApi(formData);
        return { token: data.token, user: data.user };
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (formData, { rejectWithValue }) => {
    try {
        const data = await registerUserApi(formData);
        return { token: data.token, user: data.user };
    } catch (error) {
        return rejectWithValue(error);
    }
});

const initialState = {
    token: JSON.parse(localStorage.getItem('token')) || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: true,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to login';
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to register';
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;