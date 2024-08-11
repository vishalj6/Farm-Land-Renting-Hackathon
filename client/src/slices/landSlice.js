 import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLandsApi, addLandApi, updateLandApi } from '../services/apiCalls.js'; // Adjust the import path if needed

const initialState = {
    lands: [],
    status: 'idle',
    error: null,
};

export const fetchLands = createAsyncThunk('land/fetchLands', async () => {
    try {
        const response = await fetchLandsApi();
        return response.lands; // Adjust according to your API response structure
    } catch (error) {
        throw error.response.data;
    }
});

export const addLand = createAsyncThunk('land/addLand', async (landData) => {
    try {
        const response = await addLandApi(landData);
        return response.land; // Adjust according to your API response structure
    } catch (error) {
        throw error.response.data;
    }
});

export const updateLand = createAsyncThunk('land/updateLand', async ({ id, data }) => {
    try {
        const response = await updateLandApi(id, data);
        return response.land; // Adjust according to your API response structure
    } catch (error) {
        throw error.response.data;
    }
});

const landSlice = createSlice({
    name: 'land',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLands.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLands.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.lands = action.payload;
            })
            .addCase(fetchLands.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addLand.fulfilled, (state, action) => {
                state.lands.push(action.payload);
            })
            .addCase(updateLand.fulfilled, (state, action) => {
                const index = state.lands.findIndex(land => land._id === action.payload._id);
                if (index >= 0) {
                    state.lands[index] = action.payload;
                }
            });
    },
});

export default landSlice.reducer;
