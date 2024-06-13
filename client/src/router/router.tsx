import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import { BoardPage } from '../pages/BoardPage';
import NotFoundPage from '../pages/NotFoundPage';
import { ROUTES } from '../resources/constants/routes-constants';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      // errorElement: <ErrorPage />,

      children: [
        {
          path: `${ROUTES.BOARD_ROUTE.route}`,
          element: <BoardPage />,
          children: [
            {
              path: `:boardId`,
              element: <BoardPage />,
            },
          ],
        },
      ],
    },
    {
      element: <NotFoundPage />,
      path: '*',
    },
  ],
  { window: window },
);
