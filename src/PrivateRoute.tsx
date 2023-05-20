import { Navigate, Outlet, Route, redirect, useNavigate } from "react-router-dom";
import { authService } from "./todoFirebase";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { UserData } from "./Atoms";

const PrivateRoute = () => {
    //todo, category, profile 로그인시 접근 가능 page 보호
    const [inital, setinital] = useState(false); // 초기화
    const navigate = useNavigate();
    const setTodosArray = useSetRecoilState(UserData);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            user ?? navigate("/login");
/*              setTodosArray((prev)=> prev = [{
                displayName:user?.displayName,
             }]); */
            setinital((prev) => prev = true);
        })
    }, [])

    return (
        <>
            {inital && <Outlet></Outlet>}
        </>
    );
}

export default PrivateRoute;