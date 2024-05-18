import { api, createAnonymousUser } from '../../../resources/api-constants';
import { Board } from '../board/board.types';

import { User } from './user.types';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const createUser = createAsyncThunk<User, void, { rejectValue: string }>(
  'users/create',
  async (boardData, { rejectWithValue }) => {
    try {
      const response = await api.post(createAnonymousUser(), {});
      return response.data;
    } catch (err) {
      return rejectWithValue('ssss');
    }
  },
);
export const getUser = createAsyncThunk<Board, number, { rejectValue: string }>(
  'users/get',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get<Board>(`/board/${id}`); // Assuming '/board' is the endpoint to create a board
      return response.data;
    } catch (err) {
      return rejectWithValue('Error!');
    }
  },
);
