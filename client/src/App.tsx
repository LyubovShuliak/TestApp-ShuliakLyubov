import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import background from './assets/images/img.png';
import Header from './components/header/Header';
import { COLORS } from './resources/constants/color.constants';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getTasksForBoard } from './store/slices/tasks/tasks.thunk';

import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.board.currentBoard);
  const status = useAppSelector((state) => state.board.status);

  useEffect(() => {
    if (board?.id) {
      dispatch(getTasksForBoard(board.id));
    }
  }, [board]);
  return (
    <Box
      component={'main'}
      sx={{
        display: 'flex',
        backgroundImage: `url(${background})`,

        backgroundRepeat: 'no-repeat',

        backgroundSize: 'cover',
      }}
    >
      <Header />
      <Outlet />
      {status === 'loading' ? (
        <Box
          position={'absolute'}
          top={0}
          left={0}
          bottom={0}
          right={0}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          sx={{ backgroundColor: COLORS.backdrop }}
          zIndex={100}
        >
          <CircularProgress />
        </Box>
      ) : null}
    </Box>
  );
};

export default App;
