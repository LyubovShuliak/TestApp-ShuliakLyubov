import React, { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createBoard } from '../../store/slices/board/board.thunk';
import { createUser } from '../../store/slices/user/user.thunk';

import { BoardSearch } from './BoardSearch';
import { CreateBoardModal } from './CreateBoadModal';
import { UserInfo } from './UserInfo';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state) => state.user);
  // const client = useRef<google.accounts.oauth2.CodeClient | undefined>(
  //   undefined,
  // );

  useEffect(() => {
    dispatch(createUser());
  }, []);
  // useEffect(() => {
  //   if (!client.current && google) {
  //     client.current = google.accounts.oauth2.initCodeClient({
  //       client_id: process.env.REACT_APP_CLIENT_ID as string,
  //       scope: 'email profile',
  //       select_account: true,
  //       ux_mode: 'popup',
  //       callback: (response: google.accounts.oauth2.CodeResponse) => {
  //         const xhr = new XMLHttpRequest();
  //         xhr.open('POST', sendOauth2Code(), true);
  //         xhr.setRequestHeader(
  //           'Content-Type',
  //           'application/x-www-form-urlencoded',
  //         );
  //
  //         xhr.setRequestHeader('X-Requested-With', 'XmlHttpRequest');
  //         xhr.onload = function () {
  //           console.log('Auth code response: ' + xhr.responseText);
  //           // setUser(
  //           //   JSON.parse(xhr.responseText) as {
  //           //     name: string;
  //           //     id: string;
  //           //     status: boolean;
  //           //   },
  //           // );
  //         };
  //         xhr.withCredentials = true;
  //         xhr.send('code=' + response.code);
  //       },
  //     });
  //   }
  // }, []);
  const onBoardCreate = (boardName: string) => {
    dispatch(createBoard({ name: boardName }));
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant={'dense'}>
          <CreateBoardModal onCreate={onBoardCreate} />
          <BoardSearch />
          <Box sx={{ flexGrow: 1 }} />
          <UserInfo name={user?.name} />

          <Button
            variant={'outlined'}
            color={`inherit`}
            // onClick={() => client.current?.requestCode()}
          >
            Login with Google
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
