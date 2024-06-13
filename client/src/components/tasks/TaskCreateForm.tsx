import React, { FC, useState } from 'react';

import { COLORS } from '../../resources/constants/color.constants';
import { PADDING, SPACE } from '../../resources/constants/gutter.constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createTask } from '../../store/slices/tasks/tasks.thunk';
import { TaskColumnName } from '../../store/slices/tasks/tasks.types';

import { ClickAwayListener, InputBase } from '@mui/material';
import Card from '@mui/material/Card';
type Props = {
  columnName: TaskColumnName;
  columnId: number;
  closeForm: () => void;
};
export const TaskCreateForm: FC<Props> = ({
  columnName,
  columnId,
  closeForm,
}) => {
  const [value, setValue] = useState('');
  const currentBoard = useAppSelector((state) => state.board.currentBoard);
  const user = useAppSelector((state) => state.user.user);

  const tasks = useAppSelector((state) => state.tasks.tasks[columnName]);
  const dispatch = useAppDispatch();

  const handleCreateTask = () => {
    if (value && currentBoard && user) {
      const fakeIndex = tasks.length ? -tasks.length : -1;

      dispatch(
        createTask({
          boardId: currentBoard.id,
          description: '',
          userId: user.id,
          title: value.replace(/\n/g, ' '),
          order: tasks.length + 1,
          status: columnId,
          date: new Date(),
          fakeIndex: fakeIndex,
          columnName: columnName,
        }),
      );
    }
    closeForm();
  };
  return (
    <ClickAwayListener onClickAway={handleCreateTask}>
      <Card
        variant="outlined"
        sx={{
          marginBottom: '10px',
          padding: '10px',
          boxShadow: '1',
          position: 'relative',
          minHeight: '100px',
          height: 'fit-content',
          display: 'flex',
          justifyContent: 'space-between',
          '&:hover': {
            borderColor: COLORS.primary,
            cursor: 'pointer',
          },
        }}
      >
        <InputBase
          onChange={(e) => setValue(e.target.value)}
          id="outlined-multiline-static"
          multiline
          rows={4}
          fullWidth
          value={value}
          placeholder={'Enter task title here...'}
          sx={{
            height: 'fit-content',

            padding: PADDING.extraSmall,
            boxSizing: 'border-box',
            border: '1.5px  solid transparent',
            transition: '0.4s',
            '&.Mui-focused': {
              border: '1.5px  solid',
              borderColor: COLORS.borderColor,
              borderRadius: SPACE.extraSmall,
            },
          }}
          onBlur={handleCreateTask}
        />
      </Card>
    </ClickAwayListener>
  );
};
