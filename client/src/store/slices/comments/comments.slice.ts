import {
  addComment,
  deleteComment,
  editComment,
  getComments,
} from './comments.thunk';
import { CommentsState } from './comments.types';

import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState: CommentsState = {
  comments: {},

  status: 'idle',
  error: null,
};

// Define the async thunk for creating a board

// Define the board slice
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addComment.fulfilled, (state, action) => {
      if (state.comments[action.payload.taskId]) {
        state.comments[action.payload.taskId].unshift({
          commentId: action.payload.commentId,
          comment: action.payload.comment,
          createdBy: action.payload.createdBy,
          dateCreated: action.payload.dateCreated,
        });
      } else {
        state.comments[action.payload.taskId] = [
          {
            commentId: action.payload.commentId,
            comment: action.payload.comment,
            createdBy: action.payload.createdBy,
            dateCreated: action.payload.dateCreated,
          },
        ];
      }
    });

    builder.addCase(addComment.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || null;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      if (state.comments[action.payload.taskId]) {
        const commentIndex = state.comments[action.payload.taskId].findIndex(
          (el) => el.commentId === action.payload.commentId,
        );

        state.comments[action.payload.taskId].splice(commentIndex, 1);
      }
      state.status = 'succeeded';
    });
    builder.addCase(editComment.fulfilled, (state, action) => {
      if (state.comments[action.payload.taskId]) {
        state.comments[action.payload.taskId] = state.comments[
          action.payload.taskId
        ].map((comment) =>
          comment.commentId === action.payload.id
            ? { ...comment, comment: action.payload.text }
            : comment,
        );
      }
      state.status = 'succeeded';
    });
    builder.addCase(deleteComment.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = { ...state.comments, ...action.payload };
      state.status = 'succeeded';
    });
    builder.addCase(getComments.pending, (state, action) => {
      state.status = 'loading';
    });
  },
});

// Export actions and reducer
// export const {} = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
