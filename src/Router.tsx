import { HashRouter as Router, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Todo from "./home/Todo";
import EditingCategory from "./EditingCategory";
import NotFound from "./component/Notfound";
import AuthJoin from "./AuthJoin";
import AuthLogin from "./AuthLogin";
import PrivateRoute from "./PrivateRoute";
import Profile from "./profile/Profile";

const RouterApp = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "join",
          element: <AuthJoin />, // 회원가입
        },
        {
          path: "login",
          element: <AuthLogin />, // 로그인
        },
        /* 보호하고 싶은 페이지 */
        {
          element: <PrivateRoute></PrivateRoute>,
          children: [
            {
              path: "home",
              element: <Todo />,
            },
            {
              path: "category",
              element: <EditingCategory />,
            },
            {
              path: "profile",
              element: <Profile></Profile>,
            },
          ],
        },
      ],
      errorElement: <NotFound></NotFound>,
    },
  ],
  { basename: "/my-recoil" }
);

export default RouterApp;
