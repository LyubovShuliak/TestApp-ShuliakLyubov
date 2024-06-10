import React from 'react';

import { Typography } from '@mui/material';
export const TaskInfo = ({ text }: { text: string }) => {
  return (
    <Typography
      variant="body2"
      color={'rgba(0, 0, 0, 0.6)'}
      margin={0}
      padding={0}
      fontSize={12}
    >
      {text}
    </Typography>
  );
};
