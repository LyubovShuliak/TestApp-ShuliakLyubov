import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  history: [],
  status: 'idle',
  error: null,
};

// Define the async thunk for creating a board

// Define the board slice
const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  // extraReducers: (builder) => {},
});

// Export actions and reducer
// export const {} = historySlice.actions;
export const historyReducer = historySlice.reducer;
