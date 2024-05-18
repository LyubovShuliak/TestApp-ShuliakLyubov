import React, { FC, useState } from 'react';

import { Fade, Modal, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        Create board
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
    </div>
  );
};
