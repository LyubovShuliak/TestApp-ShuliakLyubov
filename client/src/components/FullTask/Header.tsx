import React, { FC, useState } from 'react';

import { COLORS } from '../../resources/constants/color.constants';
import { PADDING, SPACE } from '../../resources/constants/gutter.constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteTask, updateTask } from '../../store/slices/tasks/tasks.thunk';
import { TaskColumnName } from '../../store/slices/tasks/tasks.types';

import { Close, Delete } from '@mui/icons-material';
import { InputBase, Stack, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
type Props = {
  title: string;
  index: number;
  column: TaskColumnName;
  handleClose: () => void;
};
export const Header: FC<Props> = ({ title, index, column, handleClose }) => {
  const [value, setValue] = useState(title);
  const task = useAppSelector((state) => state.tasks.tasks[column][index]);
  const dispatch = useAppDispatch();

  return (
    <Stack direction={'row'} paddingRight={PADDING.extraSmall}>
      <InputBase
        onBlur={() => {
          dispatch(
            updateTask({
              column,
              title: value,
              index,
              id: task.id,
            }),
          );
        }}
        type="text"
        onChange={(e) => setValue(e.target.value)}
        id="filled-hidden-label-small"
        defaultValue={title}
        size="small"
        fullWidth
        sx={{
          border: '1.5px  solid transparent',
          borderRadius: SPACE.extraSmall,
          fontWeight: 'bold',
          transition: '0.4s',
          '&.Mui-focused': {
            border: '1.5px  solid',
            borderColor: COLORS.borderColor,
            marginLeft: `-${PADDING.extraSmall}`,
            paddingLeft: PADDING.extraSmall,
            transform: `translateX($-{PADDING.extraSmall})`,
          },
        }}
      />
      <Button
        variant={'text'}
        onClick={() => {
          handleClose();
        }}
        sx={{ alignSelf: 'flex-end' }}
      >
        <Close sx={{ pointerEvents: 'none' }} />
      </Button>
      <Tooltip title="Delete task" followCursor={true} placement={'top-end'}>
        <IconButton
          aria-label="share"
          size={'medium'}
          color={'error'}
          sx={{ fontSize: 'inherit' }}
          onClick={(event) => {
            dispatch(
              deleteTask({ id: task.id, index: index, columnName: column }),
            );
          }}
        >
          <Delete fontSize={'inherit'} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
