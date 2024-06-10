import React, { FC } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const UserInfo: FC<{ name?: string }> = ({ name }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        justifySelf: 'flex-end',
        flexGrow: 1,
        maxWidth: '150px',
      }}
    >
      <Typography
        variant="body1"
        sx={{ mr: 2, width: 'fit-content', maxWidth: '150px' }}
      >
        {name}
      </Typography>
    </Box>
  );
};
