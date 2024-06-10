import React, { FC } from 'react';

import CommentIcon from '@mui/icons-material/ChatBubbleOutline';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
type Props = {
  commentsCount: number;
  handleTaskDelete: () => void;
};
export const TaskActions: FC<Props> = ({ commentsCount, handleTaskDelete }) => {
  const onEditClick = () => {
    console.log('onEditClick');
  };

  return (
    <CardActions
      disableSpacing
      sx={{
        fontSize: '16px',
        padding: 0,
        alignItems: 'flex-end',
        height: '100%',
      }}
    >
      {commentsCount ? (
        <IconButton aria-label="edit" sx={{ fontSize: 'inherit' }}>
          <CommentIcon color="action" fontSize={'inherit'} />
          <Typography variant={'body2'} pl={'4px'}>
            {commentsCount}
          </Typography>
        </IconButton>
      ) : null}
    </CardActions>
  );
};
