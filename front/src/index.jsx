import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';
import ReactDOM from 'react-dom/client';
import NewQuiz from './components/NewQuiz';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Logout from './components/Logout';
import RequireAuth from './components/RequireAuth.jsx'; 
import QuizGame from "./components/QuizGame.jsx";
import Room from "./components/Room.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth><App /></RequireAuth>,
  },
  {
    path: "/new-quiz",
    element: <RequireAuth><NewQuiz /></RequireAuth>,
  },
  {
    path: "/quiz-game",
    element: <RequireAuth><QuizGame /></RequireAuth>,
  },
  {
    path: "/room",
    element: <RequireAuth><Room /></RequireAuth>,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
