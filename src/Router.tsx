import { HashRouter as Router, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Todo from './Todo';
import EditingCategory from "./component/EditingCategory";
import NotFound from './component/Notfound';

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
                element: <EditingCategory />,
            },
        ],
        errorElement: <NotFound></NotFound>,
    }], { basename: "/my-recoil" });

export default RouterApp;