import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BoardTitle } from '../components/header/BoardTitle';
import { Board } from '../components/tasks/Board';
import { PADDING } from '../resources/constants/gutter.constants';
import { ROUTES } from '../resources/constants/routes-constants';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getBoardByHash } from '../store/slices/board/board.thunk';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export const BoardPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const board = useAppSelector((state) => state.board.currentBoard);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const boardHashFromUrl = location.pathname
      .replace(`${ROUTES.BOARD_ROUTE.route}`, '')
      .slice(1);
    if (boardHashFromUrl) {
      dispatch(getBoardByHash(boardHashFromUrl));
    }
  }, []);
  useEffect(() => {
    if (!board) {
      navigate('/board');
    }
  }, [board]);
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',

        width: '100vw',
      }}
    >
      <Toolbar />
      {board ? (
        <BoardTitle name={board?.name} hash={board?.hash} id={board?.id} />
      ) : null}

      <Box
        sx={{
          height: '100%',
          maxHeight: '100%',
          width: '100%',
          overflow: 'scroll',
          padding: PADDING.medium,
          boxSizing: 'border-box',
        }}
        ref={ref}
      >
        <Board containerRef={ref} />
      </Box>
    </Box>
  );
};
