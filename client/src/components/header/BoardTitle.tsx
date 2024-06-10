import React, { FC, useEffect, useRef, useState } from 'react';

import { COLORS } from '../../resources/constants/color.constants';
import { PADDING, SPACE } from '../../resources/constants/gutter.constants';
import { useAppDispatch } from '../../store/hooks';
import { deleteBoard, editBoard } from '../../store/slices/board/board.thunk';

import { DeleteBoardModal } from './DeleteBoard.modal';

import { ClickAwayListener, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

type Props = { name: string; hash: string; id: number };

export const BoardTitle: FC<Props> = ({ name, hash, id }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const textFieldRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(name);

  const handleCancel = () => {
    setValue(name);
  };
  const handleDelete = () => {
    dispatch(deleteBoard(id));
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleClickAway = () => {
    if (value && isEditing) dispatch(editBoard({ id, name: value }));
    if (isEditing) {
      setIsEditing(false);
    } else handleCancel();
  };

  const handleChange = (text: string) => {
    setValue(text);
  };
  useEffect(() => {
    setValue(name);
  }, [name]);
  return (
    <>
      {name ? (
        <Stack
          sx={{
            width: '100%',
            backgroundColor: 'rgb(104 255 184 / 29%)',
            paddingLeft: PADDING.large,
          }}
          direction={'row'}
          alignItems={'center'}
          color={'rgb(10,16,48)'}
        >
          <ClickAwayListener onClickAway={handleClickAway}>
            {isEditing ? (
              <TextField
                ref={textFieldRef}
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleClickAway}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                }}
                focused={true}
                sx={{
                  border: '1.5px  solid',
                  fontSize: '16px',
                  borderColor: COLORS.borderColor,
                  paddingLeft: PADDING.extraSmall,
                  backgroundColor: COLORS.dark,
                  flexGrow: 1,
                }}
              />
            ) : (
              <Typography
                noWrap
                onClick={handleClick}
                sx={{
                  cursor: 'pointer',
                  fontSize: '16px',
                  border: `1.5px  solid`,
                  borderRadius: SPACE.extraSmall,
                  borderColor: 'transparent',
                  overflow: 'hidden',
                  maxWidth: '800px',
                  paddingLeft: PADDING.extraSmall,
                }}
              >
                {value}
              </Typography>
            )}
          </ClickAwayListener>

          <Typography
            variant={'subtitle1'}
            sx={{ p: 1, ml: 2, color: COLORS.primary }}
          >
            {hash}
          </Typography>
          <DeleteBoardModal handleDelete={handleDelete} />
        </Stack>
      ) : null}
    </>
  );
};
