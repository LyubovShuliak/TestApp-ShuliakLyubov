import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDebounce } from '../../hooks/useDebounce';
import { ROUTES } from '../../resources/constants/routes-constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCurrentBoard } from '../../store/slices/board/board.slice';
import { searchBoard } from '../../store/slices/board/board.thunk';
import { Board } from '../../store/slices/board/board.types';

import { Search } from '@mui/icons-material';
import {
  Autocomplete,
  ListItem,
  ListItemText,
  TextField,
  useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';

export const BoardSearch = () => {
  const [value, setValue] = useState('');
  const currentBoard = useAppSelector((state) => state.board.currentBoard);

  const boards = useAppSelector((state) => state.board.boards);
  const dispatch = useAppDispatch();
  const search = (value: string) => {
    if (value) dispatch(searchBoard(value));
  };

  const debounce = useDebounce(search, 100);
  const trimValue = (text: string) => text.replace(/\s{2,}/, ' ').trim();
  const onInputChange = (value: string) => {
    debounce(trimValue(value));
    setValue(value);
  };

  const onChange = (board: Board) => {
    dispatch(setCurrentBoard(board));
    setValue('d');
    setValue('');
  };
  const {
    breakpoints: { down, up, between },
  } = useTheme();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentBoard) {
      navigate(`${ROUTES.BOARD_ROUTE.route}/${currentBoard.hash}`, {
        relative: 'path',
      });
    }
  }, [currentBoard]);

  return (
    <Box pl={2} pr={2} flexGrow={1}>
      <Autocomplete
        filterOptions={(boards, state) => boards}
        id="boards search"
        sx={{ flexGrow: 1 }}
        fullWidth={true}
        popupIcon={null}
        options={boards}
        inputValue={value}
        onChange={(_, value) => {
          if (value) onChange(value);
        }}
        isOptionEqualToValue={(option, value) => {
          return value.hash === option.hash;
        }}
        getOptionLabel={(option) => {
          if (option.name.match(trimValue(value))) {
            return option.name;
          } else if (option.hash.match(trimValue(value))) {
            return option.hash;
          } else {
            return option.name;
          }
        }}
        getOptionKey={(option) => option.id}
        renderOption={(props, option: Board) => {
          return (
            <ListItem
              {...props}
              sx={{
                [up('md')]: {
                  fontSize: '0.75rem',
                },
                [between('sm', 'md')]: {
                  fontSize: '0.7rem',
                },
                [down('sm')]: {
                  fontSize: '0.45rem',
                },
              }}
            >
              <div>
                <ListItemText
                  primary={option.name}
                  secondary={`hash: ${option.hash}`}
                />
              </div>
            </ListItem>
          );
        }}
        onInputChange={(_, value) => onInputChange(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              type: 'text',
              startAdornment: <Search />,
              endAdornment: null,
              placeholder: 'Search board...',
              sx: {
                '&.MuiOutlinedInput-root': {
                  height: '100%',
                },
                fontSize: '0.75rem',
                maxHeight: '64px',
                backgroundColor: 'rgb(255,255,255)',
                color: 'black',
                boxSizing: 'border-box',
                width: '100%',
              },
            }}
          />
        )}
      />
    </Box>
  );
};
