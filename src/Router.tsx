import { HashRouter as Router, Routes, Route, createBrowserRouter, useParams } from 'react-router-dom';
import App from './App';
import Todo from './Todo';
import EditingCate from "./EditingCate";
import NotFound from './Notfound';

const RouterApp = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Todo />,
            },
            {
                path: "category",
                element: <EditingCate/>,
            }
        ],
        errorElement: <NotFound></NotFound>,
    }], { basename: "/my-recoil/" });

export default RouterApp;