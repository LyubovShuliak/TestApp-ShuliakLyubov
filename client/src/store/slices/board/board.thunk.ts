import axios from 'axios';

import { api, createBoardApi } from '../../../resources/api-constants';

import { Board, CreateBoardData } from './board.types';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const createBoard = createAsyncThunk<
  Board,
  CreateBoardData,
  { rejectValue: string }
>('boards/createBoard', async (boardData, { rejectWithValue }) => {
  try {
    const response = await api.post<Board>(createBoardApi(), boardData); // Assuming '/board' is the endpoint to create a board
    return response.data;
  } catch (err) {
    return rejectWithValue('ssss');
  }
});
export const getBoard = createAsyncThunk<
  Board,
  number,
  { rejectValue: string }
>('boards/createBoard', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get<Board>(`/board/${id}`); // Assuming '/board' is the endpoint to create a board
    return response.data;
  } catch (err) {
    return rejectWithValue('Error!');
  }
});
export const editBoard = createAsyncThunk<
  Board,
  Partial<Board>,
  { rejectValue: string }
>('boards/createBoard', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get<Board>(`/board/${id}`); // Assuming '/board' is the endpoint to create a board
    return response.data;
  } catch (err) {
    return rejectWithValue('Error!');
  }
});
