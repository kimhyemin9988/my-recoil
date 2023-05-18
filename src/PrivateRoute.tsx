import { Navigate, Outlet, Route, redirect } from "react-router-dom";
import { authService } from "./todoFirebase";
import { useState } from "react";

const PrivateRoute = () => {
    const [inital, setinital] = useState(false); // 초기화
    const [userLogin, setuserLogin] = useState(false);
    authService.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in
            setuserLogin((prev) => prev = true);
            //const uid = user.uid;
        }
        else {
            setuserLogin((prev) => prev = false);
        }
        setinital((prev) => prev = true);
    })
    return (
        userLogin ? <Outlet></Outlet>
        //todo,카테고리
        : <Navigate to="login"></Navigate>);
}

export default PrivateRoute;