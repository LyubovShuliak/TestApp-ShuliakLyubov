import moment from 'moment';
import React, { FC, useEffect, useRef, useState } from 'react';

import { COLORS } from '../../resources/constants/color.constants';
import { SPACE } from '../../resources/constants/gutter.constants';
import { useAppDispatch } from '../../store/hooks';
import {
  deleteComment,
  editComment,
} from '../../store/slices/comments/comments.thunk';
import { TaskColumnName } from '../../store/slices/tasks/tasks.types';

import { DeleteCommentModal } from './DeleteComment.modal';
import { CommentI } from './FullTask';

import { AccountCircle } from '@mui/icons-material';
import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';

export const TaskComment: FC<
  CommentI & { taskId: number; status: TaskColumnName }
> = ({ createdBy, comment, taskId, commentId, dateCreated, status }) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement | null>(null);
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState(comment);

  const handleEdit = () => {
    dispatch(editComment({ text: value, taskId, id: commentId }));
    setEditable(false);
  };
  const handleCancel = () => {
    setEditable(false);
    setValue(comment);
  };
  const handleDelete = () => {
    dispatch(deleteComment({ taskId, commentId, status }));
  };
  useEffect(() => {
    if (ref.current && editable) {
      ref.current?.focus();
    }
  }, [editable]);

  return (
    <Box display="flex" marginTop={SPACE.normal} flexDirection={'row'}>
      <AccountCircle sx={{ color: 'action.active', mr: 1 }} />

      <Box display="flex" flexDirection={'column'} flexGrow={'1'}>
        <Box
          display="flex"
          flexDirection="column"
          flexGrow="1"
          gap={SPACE.small}
        >
          <Box display="flex" flexDirection={'row'} gap={SPACE.small}>
            <Typography variant="body2" fontWeight={'bold'}>
              {createdBy}
            </Typography>
            <Typography
              variant="caption"
              fontWeight={'normal'}
              sx={{ color: COLORS.textDark }}
            >
              {moment().diff(dateCreated) === 0
                ? moment(dateCreated).format('H:mm')
                : moment(dateCreated).format('D MMM YYYY H:mm')}
            </Typography>
          </Box>
          <TextField
            InputProps={{ inputRef: ref }}
            variant="outlined"
            hiddenLabel
            fullWidth
            size="small"
            value={value}
            sx={{
              fontWeight: 'bold',
              pointerEvents: !editable ? 'none' : 'all',
            }}
            onChange={(event) => setValue(event.target.value)}
          />
          {editable ? (
            <Box
              display="flex"
              flexDirection="row"
              flexGrow="1"
              gap={SPACE.small}
            >
              <Button
                onClick={handleEdit}
                size={'small'}
                sx={{ textTransform: 'none' }}
                variant={'contained'}
              >
                <Typography variant={'caption'}>Save</Typography>
              </Button>
              <Button
                onClick={handleCancel}
                size={'small'}
                sx={{
                  textTransform: 'none',
                  bgcolor: COLORS.dark,
                  color: 'black',
                }}
                variant={'contained'}
              >
                <Typography variant={'caption'}>Cancel</Typography>
              </Button>
            </Box>
          ) : null}
        </Box>
        {!editable ? (
          <Box>
            <DeleteCommentModal handleDelete={handleDelete} />
            <Button
              size={'small'}
              sx={{ textTransform: 'none' }}
              onClick={() => setEditable(true)}
            >
              <Typography variant={'caption'}>Edit</Typography>
            </Button>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};
