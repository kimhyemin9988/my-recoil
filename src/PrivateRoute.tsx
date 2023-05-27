import { Outlet, useNavigate } from "react-router-dom";
import { authService } from "./todoFirebase";
import { useEffect, useState } from "react";

const PrivateRoute = () => {
  //todo, category, profile 로그인시 접근 가능 page 보호
  //인증여부
  const [inital, setinital] = useState(false); // 초기화
  const navigate = useNavigate();
  
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      user ?? navigate("/login");
      setinital((prev) => (prev = true));
    });
  }, []);

  return <>{inital && <Outlet></Outlet>}</>;
};

export default PrivateRoute;
