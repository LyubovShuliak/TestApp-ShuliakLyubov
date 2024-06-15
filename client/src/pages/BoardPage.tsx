import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BoardTitle } from '../components/header/BoardTitle';
import { Board } from '../components/tasks/Board';
import { PADDING } from '../resources/constants/gutter.constants';
import { ROUTES } from '../resources/constants/routes-constants';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getBoardByHash } from '../store/slices/board/board.thunk';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export const BoardPage: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();

  const board = useAppSelector((state) => state.board.currentBoard);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const boardHashFromUrl = params.boardId;
    if (boardHashFromUrl) {
      dispatch(getBoardByHash(boardHashFromUrl)).then(() => {
        if (!board?.hash) {
          navigate(`${ROUTES.BOARD_ROUTE.route}`, { replace: true });
        }
      });
    }
  }, []);

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
        {board ? <Board /> : null}
      </Box>
    </Box>
  );
};
