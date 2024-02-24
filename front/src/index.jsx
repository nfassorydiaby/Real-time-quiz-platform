import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import NewCard from './components/NewCard'
import QuizPage from './components/QuizPage'
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/new-card",
        element: <NewCard />,
      },
      {
        path: "/quiz",
        element: <QuizPage />,
      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);