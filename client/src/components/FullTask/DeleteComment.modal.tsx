import React, { FC, useRef } from 'react';

import { SPACE } from '../../resources/constants/gutter.constants';

import { ClickAwayListener, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute' as const,
  width: 200,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const DeleteCommentModal: FC<{ handleDelete: () => void }> = ({
  handleDelete,
}) => {
  const [open, setOpen] = React.useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);

    handleDelete();
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Button
        ref={buttonRef}
        size={'small'}
        sx={{ textTransform: 'none', position: 'relative' }}
        onClick={handleOpen}
      >
        <Typography variant={'caption'}>Delete</Typography>

        <Box
          sx={{
            ...style,
            display: open ? 'flex' : 'none',
            flexDirection: 'column',
            borderRadius: SPACE.small,
            zIndex: 2,
            gap: '30px',

            top:
              window.innerHeight -
                (buttonRef.current?.getBoundingClientRect().bottom || 0) >
              140
                ? '100%'
                : '-130px',
            left: 0,
          }}
        >
          <Typography id="parent-modal-title" color={'black'} variant={'body1'}>
            Delete comment forever?
          </Typography>
          <Button
            variant={'contained'}
            color={'error'}
            onClick={handleClose}
            size={'small'}
          >
            Delete comment
          </Button>
        </Box>
      </Button>
    </ClickAwayListener>
  );
};
