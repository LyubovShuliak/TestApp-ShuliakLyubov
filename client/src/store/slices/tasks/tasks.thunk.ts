import { AxiosResponse } from 'axios';

import { api } from '../../../resources/constants/api-constants';
import { AppDispatch, RootState } from '../../store';

import { updateTaskData } from './tasks.slice';
import {
  ContextData,
  CreatedTask,
  CreateTaskI,
  HistoryItem,
  TaskColumnName,
  TasksAndColumnsData,
  TaskTileData,
  UpdateTask,
  UpdateTaskOrder,
} from './tasks.types';

import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit';

export const getTasksForBoard = createAsyncThunk<
  TasksAndColumnsData,
  number,
  { rejectValue: string }
>('tasks/getTasksForBoard', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get<TasksAndColumnsData>(`/tasks/${id}`);

    return response.data;
  } catch (err) {
    return rejectWithValue('Error!');
  }
});

export const reorderTask = createAsyncThunk<
  {
    status: TaskColumnName;
    taskId: number;
    history: HistoryItem[];
  },
  {
    apiRequestBody: Omit<UpdateTaskOrder, 'userId'>;
    contextData: ContextData;
  },
  { rejectValue: string; state: RootState; dispatch: AppDispatch }
>(
  'tasks/reorderTask',
  async (
    { apiRequestBody: updateTasOrder, contextData },
    { rejectWithValue, getState, dispatch },
  ) => {
    try {
      const response = await api.patch<
        HistoryItem[],
        AxiosResponse<HistoryItem[]>,
        Omit<UpdateTaskOrder, 'taskId' | 'boardId'>
      >(`/tasks/order/${updateTasOrder.taskId}/${updateTasOrder.boardId}`, {
        columnId: updateTasOrder.columnId,
        order: updateTasOrder.order,
        previousColumnId: updateTasOrder.previousColumnId,
        previousOrder: updateTasOrder.previousOrder,
        userId: getState().user.user?.id || 0,
      });

      return {
        status: contextData.destination,
        taskId: updateTasOrder.taskId,
        history: response.data,
      };
    } catch (err) {
      return rejectWithValue('Error!');
    }
  },
);
export const updateTask = createAsyncThunk<
  TaskTileData,
  UpdateTask,
  { rejectValue: string; state: RootState; dispatch: Dispatch }
>(
  'tasks/update',
  async (updateBody, { rejectWithValue, getState, dispatch }) => {
    try {
      const updatedTask = await api.patch<
        TaskTileData,
        AxiosResponse<TaskTileData>,
        Omit<UpdateTask, 'id' | 'column' | 'index'>
      >(`/tasks/${updateBody.id}`, {
        description: updateBody.description,
        title: updateBody.title,
      });
      dispatch(
        updateTaskData({
          update: updateBody,
          index: updateBody.index,
          column: updateBody.column,
        }),
      );
      return updatedTask.data;
    } catch (err) {
      return rejectWithValue('Error!');
    }
  },
);

export const createTask = createAsyncThunk<
  CreatedTask,
  CreateTaskI,
  { rejectValue: string }
>('tasks/create', async (newTask, { rejectWithValue }) => {
  try {
    const createdTask = await api.post<
      CreatedTask,
      AxiosResponse<CreatedTask>,
      CreateTaskI
    >(`/tasks`, newTask);
    return createdTask.data;
  } catch (err) {
    return rejectWithValue('Error!');
  }
});
export const deleteTask = createAsyncThunk<
  { id: number; columnName: TaskColumnName; index: number },
  { id: number; columnName: TaskColumnName; index: number },
  { rejectValue: string }
>('tasks/delete', async ({ id, columnName, index }, { rejectWithValue }) => {
  try {
    const deletedTask = await api.delete<
      CreatedTask,
      AxiosResponse<CreatedTask>,
      CreateTaskI
    >(`/tasks/${id}`);
    return { id, columnName, index };
  } catch (err) {
    return rejectWithValue('Error!');
  }
});
