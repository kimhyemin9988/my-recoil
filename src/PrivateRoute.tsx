import { Navigate, Outlet, Route, redirect, useNavigate } from "react-router-dom";
import { authService } from "./todoFirebase";
import { useEffect, useState } from "react";

const PrivateRoute = () => {
    const [inital, setinital] = useState(false); // 초기화
    const [userLogin, setuserLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in
                setuserLogin((prev) => prev = true);
                //const uid = user.uid;
            }
            else {
                setuserLogin((prev) => prev = false);
                navigate("/login");
            }
            setinital((prev) => prev = true);
        })
    }, [])
    return (
        <Outlet></Outlet>
        );
}

export default PrivateRoute;