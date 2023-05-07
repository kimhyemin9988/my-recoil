import { HashRouter as Router, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Todo from './Todo';
import EditingCategory from "./component/EditingCategory";
import NotFound from './component/Notfound';
import AuthJoin from './AuthJoin';
import AuthLogin from './AuthLogin';

const RouterApp = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "category",
                element: <EditingCategory />,
            },
            {
                path: "login",
                element: <AuthLogin />, // 로그인
            },
            {
                path: "todo",
                element: <Todo />,
            },
            {
                path: "join",
                element: <AuthJoin />, // 회원가입
            },
        ],
        errorElement: <NotFound></NotFound>,
    }], { basename: "/my-recoil" });

export default RouterApp;