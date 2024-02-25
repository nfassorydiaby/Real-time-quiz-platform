import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NewQuiz from './components/NewQuiz';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/new-quiz",
        element: <NewQuiz />,
      },
    ],
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);