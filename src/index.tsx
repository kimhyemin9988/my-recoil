import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from "recoil";
import RouterApp from './Router';
import { RouterProvider } from 'react-router-dom';
import firebase from "firebase/compat/app";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <RouterProvider router={RouterApp} />
  </RecoilRoot>
);
