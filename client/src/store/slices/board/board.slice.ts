import {
  createBoard,
  deleteBoard,
  editBoard,
  getBoardByHash,
  searchBoard,
} from './board.thunk';
import { Board, BoardsState } from './board.types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    setCurrentBoard: (state, action: PayloadAction<Board>) => {
      state.currentBoard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(createBoard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.boards.push(action.payload);
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(searchBoard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.boards = action.payload;
      })
      .addCase(searchBoard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(editBoard.fulfilled, (state, action) => {
        if (state.currentBoard?.id === action.payload.id) {
          state.currentBoard.name = action.payload.name;
        }
        state.status = 'succeeded';
        state.boards = state.boards.map((el) =>
          el.id === action.payload.id ? action.payload : el,
        );
      })
      .addCase(editBoard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(
        deleteBoard.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = 'succeeded';
          state.boards = state.boards.filter((el) => el.id !== action.payload);
          state.currentBoard = initialState.currentBoard;
        },
      )
      .addCase(deleteBoard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      .addCase(getBoardByHash.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getBoardByHash.fulfilled,
        (state, action: PayloadAction<Board>) => {
          state.status = 'succeeded';
          state.currentBoard = action.payload;
        },
      )
      .addCase(getBoardByHash.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { setLoading, setCurrentBoard } = boardSlice.actions; // If you have other actions, you can define them here
export const boardReducer = boardSlice.reducer;
