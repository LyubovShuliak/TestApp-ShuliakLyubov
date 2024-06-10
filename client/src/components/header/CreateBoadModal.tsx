import React, { FC, useState } from 'react';

import { Add } from '@mui/icons-material';
import { Fade, Modal, TextField, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const CreateBoardModal: FC<{
  onCreate: (boardName: string) => void;
}> = ({ onCreate }) => {
  const [open, setOpen] = useState(false);
  const [boardName, setBoardName] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    onCreate(boardName);
    setBoardName('');
    setOpen(false);
  };
  const {
    breakpoints: { down, up, between },
  } = useTheme();
  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',

    boxShadow: 24,
    p: 4,

    minWidth: '250px',
    maxWidth: '400px',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255)',
    borderRadius: '23px',
    [up('md')]: {
      padding: '60px',
    },
    [between('sm', 'md')]: {
      padding: '40px',
    },
    [down('sm')]: {
      padding: '25px',
    },
  };
  const [showText, setShowText] = useState(false);
  return (
    <Box height={'100%'}>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpen}
        onMouseOver={(event) => setShowText(true)}
        onMouseLeave={() => setShowText(false)}
      >
        <Add />
        <Box
          sx={{
            display: 'block',

            transition: '.6s',
            overflow: 'hidden',
            p: '0.003rem',

            [up('md')]: {
              width: showText ? `7rem` : '0px',
            },
            [between('sm', 'md')]: {
              width: showText ? `6rem` : '0px',
            },
            [down('sm')]: {
              width: showText ? `4rem` : '0px',
            },
          }}
        >
          <Typography
            variant={'caption'}
            component={'div'}
            sx={{
              '&.MuiTypography-root': {
                display: 'block',

                lineHeight: '100%',
                [up('md')]: {
                  fontSize: '0.75rem',
                  width: '7rem',
                },
                [between('sm', 'md')]: {
                  fontSize: '0.7rem',
                  width: '6rem',
                },
                [down('sm')]: {
                  fontSize: '0.45rem',
                  width: '4rem',
                },
              },
            }}
          >
            Create board
          </Typography>
        </Box>
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Fade in={open}>
          <Box sx={style}>
            <h2 id="simple-modal-title">Create Board</h2>
            <TextField
              id="board-name"
              label="Board Name"
              variant="outlined"
              fullWidth
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              style={{ marginBottom: '20px' }}
            />
            <Button variant="contained" color="primary" onClick={handleCreate}>
              Create
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};
