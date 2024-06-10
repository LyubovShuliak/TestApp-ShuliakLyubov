import { boardReducer } from './slices/board/board.slice';
import { commentsReducer } from './slices/comments/comments.slice';
import { historyReducer } from './slices/history/history.slice';
import { tasksReducer } from './slices/tasks/tasks.slice';
import { userReducer } from './slices/user/user.slice';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: combineReducers({
    board: boardReducer,
    user: userReducer,
    tasks: tasksReducer,
    comments: commentsReducer,
    history: historyReducer,
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// export const persistor = persistStore(store);
