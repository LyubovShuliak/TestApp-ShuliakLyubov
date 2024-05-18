import React, { FC } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
export const UserInfo: FC<{ name?: string }> = ({ name }) => {
  return (
    <>
      {name ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {name}
          </Typography>
        </Box>
      ) : null}
    </>
  );
};
