import { boardReducer } from './slices/board/board.slice';
import { userReducer } from './slices/user/user.slice';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: combineReducers({
    board: boardReducer,
    user: userReducer,
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// export const persistor = persistStore(store);
