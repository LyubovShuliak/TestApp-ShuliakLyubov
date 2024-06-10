import moment from 'moment';
import React, { FC, useState } from 'react';

import { DATE_FORMAT } from '../../resources/constants/dateFromat.constants';
import { SPACE } from '../../resources/constants/gutter.constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addComment } from '../../store/slices/comments/comments.thunk';
import { TaskColumnName } from '../../store/slices/tasks/tasks.types';

import { AccountCircle } from '@mui/icons-material';
import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
type Props = {
  index: number;
  status: TaskColumnName;
};
export const AddCommentForm: FC<Props> = ({ index, status }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const task = useAppSelector((state) => state.tasks.tasks[status][index]);
  const error = useAppSelector((state) => state.comments.error);
  const [value, setValue] = useState('');
  const [saveButtonActive, setSaveButtonActive] = useState(false);

  const handleAddComment = () => {
    if (user && value)
      dispatch(
        addComment({
          columnName: status,
          comment: {
            taskId: task.id,
            text: value,
            userId: user.id,
            userName: user.name,
            dateCreated: moment().format(DATE_FORMAT),
          },
        }),
      );
    setValue('');
    setSaveButtonActive(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: SPACE.extraSmall,
      }}
    >
      <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <Box
        sx={{
          flexDirection: 'column',
          display: 'flex',
          width: '100%',
          alignItems: 'flex-start',
          gap: SPACE.extraSmall,
        }}
      >
        <TextField
          helperText={error}
          error={!!error}
          id="input-with-sx"
          size={'small'}
          placeholder="Write a comment ..."
          variant="outlined"
          fullWidth
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => {
            setSaveButtonActive(true);
          }}
        />
        {saveButtonActive ? (
          <Button variant={'contained'} onClick={handleAddComment}>
            Save
          </Button>
        ) : null}
      </Box>
    </Box>
  );
};
