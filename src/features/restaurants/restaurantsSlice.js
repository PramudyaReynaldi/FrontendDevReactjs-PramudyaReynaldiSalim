import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    restaurants: [],
    status: 'idle',
    error: null,
    detail: null,
    detailStatus: 'idle',
    detailError: null,
};

export const fetchRestaurantsAsync = createAsyncThunk(
    "restaurants/fetchRestaurants",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/list`);
            return response.data.restaurants;
        } catch (error) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error.response.data);
            }
            return thunkAPI.rejectWithValue({ error: "Unknown error" });
        }
    }
);

export const fetchRestaurantDetailAsync = createAsyncThunk(
    'restaurants/fetchRestaurantDetail',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/detail/${id}`);
            return response.data.restaurant;
        } catch (error) {
            if (error.response) {
                return thunkAPI.rejectWithValue(error.response.data);
            }
        }
    }
);

const restaurantsSlice = createSlice({
    name: "restaurants",
    initialState,
    reducers: {
        clearDetailState: (state) => {
            state.detail = null;
            state.detailStatus = 'idle';
            state.detailError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch semua data restoran
            .addCase(fetchRestaurantsAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchRestaurantsAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.restaurants = action.payload;
            })
            .addCase(fetchRestaurantsAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ? action.payload.error : "Failed to fetch data";
            })

            // Fetch detail data restoran
            .addCase(fetchRestaurantDetailAsync.pending, (state) => {
                state.detailStatus = 'loading';
            })
            .addCase(fetchRestaurantDetailAsync.fulfilled, (state, action) => {
                state.detailStatus = 'succeeded';
                state.detail = action.payload;
            })
            .addCase(fetchRestaurantDetailAsync.rejected, (state, action) => {
                state.detailStatus = 'failed';
                state.detailError = action.error.message;
            });
    },
});

export const { clearDetailState } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;
