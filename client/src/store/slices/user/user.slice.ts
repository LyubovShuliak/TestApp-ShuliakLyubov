import { createUser } from './user.thunk';
import { UserState } from './user.types';

import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState: UserState = {
  status: 'idle',
  error: null,
};

// Define the async thunk for creating a board

// Define the board slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.status = 'loading';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { setLoading } = userSlice.actions; // If you have other actions, you can define them here
export const userReducer = userSlice.reducer;
