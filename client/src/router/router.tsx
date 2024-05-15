import React from 'react';
import { ActionFunction, createBrowserRouter } from 'react-router-dom';

import App from '../App';
import {ROUTES} from "../resources/routes-constants";
import {  BoardPage} from "../pages/BoardPage";





export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      // errorElement: <ErrorPage />,

      children: [

        {
          path: ROUTES.BOARD_ROUTE.route,
          element: <BoardPage/>,

        }
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
