import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {PersistGate} from "redux-persist/integration/react";
import { Provider } from 'react-redux';
import {persistor, store} from "./store/reducers/store";
import {RouterProvider} from "react-router-dom";
import {router} from "./router/router";

const root = createRoot(document.getElementById('root')!) // createRoot(container!) if you use TypeScript
root.render(<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
    </PersistGate>
</Provider>,)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
