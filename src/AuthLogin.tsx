import { useState } from "react";
import styled from "styled-components";
import { Main } from "./Todo";
import { Container, SubmitInput, TodoInput } from "./component/CreateToDo";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "./todoFirebase";


export const TitleSpan = styled.span`
    font-size: 2rem;
    font-weight: 700;
    color:#503F47;
    @media screen and (max-width: 550px){
      font-size: 1.5rem;
    }
`
export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const LoginInput = styled(TodoInput)`
    width: 300px;
    @media screen and (max-width: 550px){
        width: 250px;
    }
`
export const LoginSubmit = styled(SubmitInput)`
    border: 1px solid #503F47;
    min-width: 50%;
    height: 30px;
`
export const LoginSubmit2 = styled.button`
    width: 100px;
    height: 30px;
    background-color: #503F47;
    color: white;
    border-radius: 0.3rem;
    font-weight: 900;
    text-align: center;
    cursor: pointer;
    border: 1px solid white;
    margin: 10px;
`
export const TitleDiv = styled.div`
    display: flex;
    justify-content: center;
    margin: 1rem;
`
export interface LoginI {
    userEmail: string,
    userPassword: string,
};

export const FormLabel = styled.label`
    color:#00b7ff;
    font-weight: 800;
    margin: 0.3rem;
    font-size: 0.8rem;
`

export const AuthErrorM = styled.span`
    color: #ff0000;
    margin: 0.3rem;
    font-size: 0.7rem;
`
export const AuthInputDiv = styled.div`
    display: flex;
    flex-direction: column;
    height: 6.5rem;
`
export const AuthContainer = styled(Container)`
    background-color: white;
`
const AuthLogin = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginI>();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState<string>();
    const onSubmit = async (data: LoginI) => {
        {
            try {
                // User is signed in
                await signInWithEmailAndPassword(authService, data.userEmail, data.userPassword);
                navigate("/home");
            } catch (error: any) {
                let loginError = (() => {
                    switch (error.code) {
                        case "auth/wrong-password":
                            return "아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.";
                        case "auth/timeout":
                            return "네트워크 연결에 실패 하였습니다.";
                        default:
                            return "알 수 없는 이유로 로그인에 실패 하였습니다.";
                    }
                })();
                setLoginError((prev) => prev = loginError);
            };
        }
    };
    return (

        <Main>
            <AuthContainer>
                <TitleDiv>
                    <TitleSpan>로그인 하기</TitleSpan>
                </TitleDiv>
                <TitleDiv>
                    <LoginForm onSubmit={handleSubmit(onSubmit)}>
                        <LoginInput {...register("userEmail", { required: "이메일을 입력해 주세요." })} placeholder="이메일을 입력하세요" type="email"></LoginInput>
                        {loginError === undefined && <AuthErrorM>{errors.userEmail?.message}</AuthErrorM>}
                        <LoginInput {...register("userPassword", { required: "비밀번호를 입력해 주세요." })} placeholder="비밀번호를 입력하세요" type="password"></LoginInput>
                        {loginError === undefined && <AuthErrorM>{errors.userPassword?.message}</AuthErrorM>}
                        <AuthErrorM>{loginError}</AuthErrorM>
                        <LoginSubmit as="button" type="submit">
                            <h1>이메일 로그인</h1>
                        </LoginSubmit>
                    </LoginForm>
                </TitleDiv>
                <hr></hr>
                <TitleDiv>
                    <LoginSubmit2 type="button">
                        <h1>구글 로그인</h1>
                    </LoginSubmit2>
                    <LoginSubmit2 type="button">
                        <h1>깃허브 로그인</h1>
                    </LoginSubmit2>
                </TitleDiv>
                <hr></hr>
                <TitleDiv>
                    <Link to="../join">
                        <LoginSubmit2 type="button">
                            회원 가입
                        </LoginSubmit2>
                    </Link>
                    <LoginSubmit2 type="button">
                        <h1>비밀번호 찾기</h1>
                    </LoginSubmit2>
                </TitleDiv>
            </AuthContainer>
        </Main>
    );
};
export default AuthLogin;

