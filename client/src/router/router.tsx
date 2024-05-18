import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import { BoardPage } from '../pages/BoardPage';
import { ROUTES } from '../resources/routes-constants';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      // errorElement: <ErrorPage />,

      children: [
        {
          path: '/',
          element: <BoardPage />,
        },

        {
          path: ROUTES.BOARD_ROUTE.route,
          element: <BoardPage />,
        },
      ],
    },
    // {
    //   path: '*',
    //   element: <DashboardLayout />,
    //   children: [
    //     {
    //       element: <ErrorPage />,
    //       path: '*',
    //     },
    //   ],
    // },
  ],
  { window: window },
);
