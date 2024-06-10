import { AxiosError } from 'axios';

import {
  api,
  createBoardApi,
} from '../../../resources/constants/api-constants';

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
>('boards/getBoard', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get<Board>(`/board/${id}`); // Assuming '/board' is the endpoint to create a board
    return response.data;
  } catch (err) {
    return rejectWithValue('Error!');
  }
});

export const getBoardByHash = createAsyncThunk<
  Board,
  string,
  { rejectValue: string }
>('boards/getBoardByHash', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get<Board>(`/board/hash/${id}`); // Assuming '/board' is the endpoint to create a board
    return response.data;
  } catch (err) {
    return rejectWithValue('Error!');
  }
});
export const searchBoard = createAsyncThunk<
  Board[],
  string,
  { rejectValue: string }
>('boards/searchBoard', async (query, { rejectWithValue }) => {
  try {
    const response = await api.get<Board[]>(`/board/search/?query=${query}`);
    // Assuming '/board' is the endpoint to create a board

    return response.data;
  } catch (err) {
    return rejectWithValue('Error!');
  }
});
export const editBoard = createAsyncThunk<
  Board,
  { name: string; id: number },
  { rejectValue: string }
>('boards/editBoard', async ({ name, id }, { rejectWithValue }) => {
  try {
    const response = await api.patch<Board>(`/board/${id}`, { name });
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) return rejectWithValue(err.response?.data);
    else
      return rejectWithValue(
        'Error. Something wrong. Check internet connection or try latter.',
      );
  }
});
export const deleteBoard = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('boards/deleteBoard', async (id, { rejectWithValue }) => {
  try {
    await api.delete<void>(`/board/${id}`);
    console.log(id);
    // Assuming '/board' is the endpoint to create a board
    return id;
  } catch (err) {
    return rejectWithValue('Error!');
  }
});
