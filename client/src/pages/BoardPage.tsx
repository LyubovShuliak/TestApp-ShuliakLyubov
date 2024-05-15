import React from 'react';
import { ROUTES } from '../resources/routes-constants';
import { Board } from '../components/tasks/Board';

export const BoardPage: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ fontSize: '4em' }}>{ROUTES.BOARD_ROUTE.name}</h1>
      <Board />
    </div>
  );
};
