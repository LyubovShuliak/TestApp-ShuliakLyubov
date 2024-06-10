import React, { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createBoard } from '../../store/slices/board/board.thunk';
import { createUser } from '../../store/slices/user/user.thunk';

import { BoardSearch } from './BoardSearch';
import { CreateBoardModal } from './CreateBoadModal';
import { UserInfo } from './UserInfo';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(createUser());
  }, []);

  const onBoardCreate = (boardName: string) => {
    dispatch(createBoard({ name: boardName }));
  };
  return (
    <AppBar component={'nav'} sx={{ backgroundColor: 'rgba(141,51,214,0.44)' }}>
      <Toolbar variant={'regular'}>
        <CreateBoardModal onCreate={onBoardCreate} />
        <BoardSearch />

        <UserInfo name={user?.name} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
