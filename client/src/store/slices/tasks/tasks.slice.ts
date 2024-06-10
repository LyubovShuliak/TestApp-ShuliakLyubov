import { utcDateTimeToLocalDateTime } from '../../../resources/utils/utcDateTimeToLocalDateTime';
import { deleteBoard } from '../board/board.thunk';
import { Column } from '../board/board.types';

import {
  createTask,
  deleteTask,
  getTasksForBoard,
  reorderTask,
  updateTask,
} from './tasks.thunk';
import {
  CreatedTask,
  TaskColumnName,
  TasksState,
  TaskTileData,
} from './tasks.types';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TasksState = {
  tasks: { ['TODO']: [], ['In Progress']: [], ['DONE']: [] },
  columns: {
    ['TODO']: { taskIds: [], columnId: 0 },
    ['In Progress']: { taskIds: [], columnId: 1 },
    ['DONE']: { taskIds: [], columnId: 2 },
  },
  history: {},
  status: 'idle',
  error: null,
};

// Define the async thunk for creating a board

// Define the board slice
const tasksSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    changeCommentsCount: (
      state,
      action: PayloadAction<{
        status: TaskColumnName;
        taskId: number;
        count: number;
      }>,
    ) => {
      state.tasks[action.payload.status] = state.tasks[
        action.payload.status
      ].map((task) =>
        task.id === action.payload.taskId
          ? { ...task, commentsCount: action.payload.count }
          : task,
      );
    },
    changeTasks: (
      state,
      action: PayloadAction<{
        source:
          | TaskColumnName.TODO
          | TaskColumnName.IN_PROGRESS
          | TaskColumnName.DONE;
        destination:
          | TaskColumnName.TODO
          | TaskColumnName.IN_PROGRESS
          | TaskColumnName.DONE;
        currentTaskIndex: number;
        futureTaskIndex: number;
        taskId: number;
      }>,
    ) => {
      const { source, futureTaskIndex, currentTaskIndex, destination, taskId } =
        action.payload;

      const start = state.columns[source];
      const finish = state.columns[destination];

      if (source === destination) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(currentTaskIndex, 1);
        newTaskIds.splice(futureTaskIndex, 0, taskId);
        const moved = state.tasks[source].find(
          (el: TaskTileData) => el.id === Number(taskId),
        );
        if (!moved) {
          return;
        }

        const finishTasks = state.tasks[destination];
        finishTasks.splice(currentTaskIndex, 1);
        finishTasks.splice(futureTaskIndex, 0, moved);

        state.tasks[destination] = finishTasks;

        state.columns[destination].taskIds = newTaskIds;
      } else {
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(currentTaskIndex, 1);
        state.columns[source].taskIds = startTaskIds;

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(futureTaskIndex, 0, taskId);
        state.columns[destination].taskIds = finishTaskIds;
        const moved = state.tasks[source].find(
          (el: TaskTileData) => el.id === Number(taskId),
        );

        const finishTasks = state.tasks[destination];
        if (!moved) return;
        finishTasks.splice(futureTaskIndex, 0, moved);

        state.tasks[source] = state.tasks[source].filter(
          (el: TaskTileData) => moved.id !== el.id,
        );

        state.tasks[destination] = finishTasks;
        state.status = 'succeeded';
      }
    },
    setLoading: (state) => {
      state.status = 'loading';
    },
    updateTaskData: (
      state,
      action: PayloadAction<{
        column: TaskColumnName;
        index: number;
        update: Partial<TaskTileData>;
      }>,
    ) => {
      state.tasks[action.payload.column][action.payload.index] = {
        ...state.tasks[action.payload.column][action.payload.index],
        ...action.payload.update,
      };
    },

    setTasksAndColumnsFromCache: (
      state,
      action: PayloadAction<{
        tasks: { [key in TaskColumnName]: TaskTileData[] };
        columns: { [key in TaskColumnName]: Column };
      }>,
    ) => {
      state.tasks = action.payload.tasks;
      state.columns = action.payload.columns;
      Object.values(action.payload.tasks).forEach((el) => {
        el.forEach((task) => (state.history[task.id] = task.history));
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteBoard.fulfilled, (state) => (state = initialState));
    builder.addCase(getTasksForBoard.fulfilled, (state, action) => {
      state.tasks = action.payload.tasks;
      state.columns = action.payload.columns;
      Object.values(action.payload.tasks).forEach((el) => {
        el.forEach((task) => (state.history[task.id] = task.history));
      });
    });

    builder.addCase(reorderTask.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(reorderTask.fulfilled, (state, action) => {
      state.status = 'succeeded';

      state.history[action.payload.taskId] = action.payload.history.map(
        (el) => ({
          ...el,
          dateCreated: utcDateTimeToLocalDateTime(el.dateCreated),
        }),
      );
    });
    builder.addCase(reorderTask.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(updateTask.fulfilled, (state) => {
      state.status = 'succeeded';
    });
    builder.addCase(updateTask.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(
      createTask.fulfilled,
      (state, action: PayloadAction<CreatedTask>) => {
        state.status = 'succeeded';
        state.tasks[action.payload.columnName].push(action.payload.task);
        state.columns[action.payload.columnName].taskIds.push(
          action.payload.task.id,
        );
        state.history[action.payload.task.id] = action.payload.task.history;
      },
    );
    builder.addCase(createTask.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(
      deleteTask.fulfilled,
      (
        state,
        action: PayloadAction<{
          id: number;
          columnName: TaskColumnName;
          index: number;
        }>,
      ) => {
        state.status = 'succeeded';
        state.tasks[action.payload.columnName].splice(action.payload.index, 1);
        state.columns[action.payload.columnName].taskIds.splice(
          action.payload.index,
          1,
        );
      },
    );
    builder.addCase(deleteTask.rejected, (state) => {
      state.status = 'failed';
    });
    //   builder.addCase(getColumns.fulfilled, (state, action) => {
    //     for (const column of action.payload) {
    //       state.columns[column.name].columnId = column.columnId;
    //     }
    //   });
  },
});

// Export actions and reducer
export const {
  changeCommentsCount,
  setLoading,
  updateTaskData,
  setTasksAndColumnsFromCache,
  changeTasks,
} = tasksSlice.actions; // If you have other actions, you can define them here
export const tasksReducer = tasksSlice.reducer;
