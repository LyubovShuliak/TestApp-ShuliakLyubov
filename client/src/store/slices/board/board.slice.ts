import { createBoard } from './board.thunk';
import { BoardsState } from './board.types';

import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState: BoardsState = {
  boards: [],
  status: 'idle',
  error: null,
};

// Define the async thunk for creating a board

// Define the board slice
const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.status = 'loading';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBoard.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.boards.push(action.payload);
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { setLoading } = boardSlice.actions; // If you have other actions, you can define them here
export const boardReducer = boardSlice.reducer;
