import React, { FC, useRef } from 'react';

import { SPACE } from '../../resources/constants/gutter.constants';

import { DeleteOutline } from '@mui/icons-material';
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

export const DeleteBoardModal: FC<{ handleDelete: () => void }> = ({
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
      {/*<MenuItem disableRipple>*/}
      <Button
        onClick={handleOpen}
        sx={{ position: 'relative' }}
        color={'error'}
        role={'alert'}
      >
        <DeleteOutline />
        Delete
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
            Delete board forever?
          </Typography>
          <Button
            variant={'contained'}
            color={'error'}
            onClick={handleClose}
            size={'small'}
          >
            Delete board
          </Button>
        </Box>
      </Button>
      {/*<Button*/}
      {/*  ref={buttonRef}*/}
      {/*  size={'small'}*/}
      {/*  sx={{ textTransform: 'none', position: 'relative' }}*/}
      {/*  onClick={handleOpen}*/}
      {/*>*/}

      {/*</Button>*/}
      {/*</MenuItem>*/}
    </ClickAwayListener>
  );
};
