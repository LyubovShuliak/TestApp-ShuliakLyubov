import { AxiosError, AxiosResponse } from 'axios';

import { CommentI } from '../../../components/FullTask/FullTask';
import { api } from '../../../resources/constants/api-constants';
import { utcDateTimeToLocalDateTime } from '../../../resources/utils/utcDateTimeToLocalDateTime';
import { AppDispatch } from '../../store';
import { TaskColumnName, TasksAndColumnsData } from '../tasks/tasks.types';

import { Comment } from './comments.types';

import { createAsyncThunk } from '@reduxjs/toolkit';

export const addComment = createAsyncThunk<
  CommentI & { taskId: number },
  { columnName: TaskColumnName; comment: Comment },
  { rejectValue: string; dispatch: AppDispatch }
>('comments/add', async (data, { rejectWithValue, dispatch }) => {
  const {
    comment: { dateCreated, taskId, userId, text, userName },
    columnName,
  } = data;
  try {
    const response = await api.post<number, AxiosResponse<number>, Comment>(
      `/comments`,
      data.comment,
    );

    return {
      commentId: response.data,
      comment: text,
      createdBy: userName,
      taskId: taskId,
      dateCreated,
    };
  } catch (err) {
    if (err instanceof AxiosError && err.response?.data.message)
      return rejectWithValue(err.response.data.message);
    else
      return rejectWithValue(
        'Error. Something wrong. Check internet connection or try latter.',
      );
  }
});
export const deleteComment = createAsyncThunk<
  { taskId: number; commentId: number; status: TaskColumnName },
  { taskId: number; commentId: number; status: TaskColumnName },
  { rejectValue: string }
>('comments/remove', async (request, { rejectWithValue }) => {
  try {
    await api.delete<TasksAndColumnsData>(`/comments/${request.commentId}`);
    return request;
  } catch (err) {
    return rejectWithValue('Error!');
  }
});
export const getComments = createAsyncThunk<
  { [key: number]: CommentI[] },
  number,
  { rejectValue: string }
>('comments/get', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get<CommentI[]>(`/comments/${id}`);

    return {
      [id]: response.data.map((el) => ({
        ...el,
        dateCreated: utcDateTimeToLocalDateTime(el.dateCreated),
      })),
    };
  } catch (err) {
    return rejectWithValue('Error!');
  }
});
export const editComment = createAsyncThunk<
  { text: string; id: number; taskId: number },
  { text: string; id: number; taskId: number },
  { rejectValue: string; dispatch: AppDispatch }
>('comments/edit', async (comment, { rejectWithValue, dispatch }) => {
  try {
    await api.patch(`/comments/${comment.id}`, {
      text: comment.text,
    });

    return comment;
  } catch (err) {
    return rejectWithValue('Error!');
  }
});
