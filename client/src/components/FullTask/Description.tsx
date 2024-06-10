import React, { FC, useState } from 'react';

import { COLORS } from '../../resources/constants/color.constants';
import { PADDING, SPACE } from '../../resources/constants/gutter.constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateTask } from '../../store/slices/tasks/tasks.thunk';
import { TaskColumnName } from '../../store/slices/tasks/tasks.types';

import { Box, InputBase } from '@mui/material';
type Props = {
  description: string;
  index: number;
  column: TaskColumnName;
};
export const DescriptionComponent: FC<Props> = ({
  description,
  column,
  index,
}) => {
  const [value, setValue] = useState(description);
  const task = useAppSelector((state) => state.tasks.tasks[column][index]);
  const dispatch = useAppDispatch();
  console.log(description);
  return (
    <Box
      sx={{
        marginTop: SPACE.medium,
        marginBottom: SPACE.medium,
        paddingLeft: PADDING.extraSmall,
      }}
    >
      <InputBase
        onChange={(e) => setValue(e.target.value)}
        id="outlined-multiline-static"
        multiline
        rows={4}
        fullWidth
        value={value}
        sx={{
          backgroundColor: COLORS.dark,
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
        onBlur={() => {
          dispatch(
            updateTask({ column, description: value, index, id: task.id }),
          );
        }}
      />
    </Box>
  );
};
