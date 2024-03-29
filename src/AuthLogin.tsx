import { useState } from "react";
import styled from "styled-components";
import { Main } from "./home/Todo";
import { Container, TodoInput } from "./home/CreateToDo";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { authService } from "./todoFirebase";

export const TitleSpan = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: #503f47;
  @media screen and (max-width: 550px) {
    font-size: 1.5rem;
  }
`;
export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const LoginInput = styled(TodoInput)`
  width: 300px;
  @media screen and (max-width: 550px) {
    width: 250px;
  }
`;
export const LargeBtnWhite = styled.button<{ changeImg?: boolean }>`
  border: 1px solid #503f47;
  min-width: 50%;
  height: 30px;
  background-color: ${(props) => (props.changeImg ? `red` : `white`)};
  color: ${(props) => (props.changeImg ? `white` : ` #503F47`)};
  border-radius: 0.3rem;
  font-weight: 900;
  text-align: center;
  cursor: pointer;
  margin: 10px;
`;
export const LargeBtnDark = styled.button`
  width: 100px;
  height: 30px;
  background-color: #503f47;
  color: white;
  border-radius: 0.3rem;
  font-weight: 900;
  text-align: center;
  cursor: pointer;
  border: 1px solid white;
  margin: 10px;
`;
export const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;
export interface LoginI {
  userEmail: string;
  userPassword: string;
}

export const FormLabel = styled.label`
  color: #00b7ff;
  font-weight: 800;
  margin: 0.3rem;
  font-size: 0.8rem;
`;

export const AuthErrorM = styled.span`
  color: #ff0000;
  margin: 0.3rem;
  font-size: 0.7rem;
`;
export const AuthInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 6.5rem;
`;
export const AuthContainer = styled(Container)`
  background-color: white;
`;
const AuthLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginI>();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string>();
  const onSubmit = async (data: LoginI) => {
    try {
      // User is signed in
      await signInWithEmailAndPassword(
        authService,
        data.userEmail,
        data.userPassword
      );
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
      setLoginError((prev) => (prev = loginError));
    }
  };

  const socialLogin = async (event: React.MouseEvent) => {
    const { currentTarget: { id } } = event;
    let provider;
    if (id === "google") {
      provider = new GoogleAuthProvider();
    }
    else if (id === "github") {
      provider = new GithubAuthProvider();
    }
    provider !== undefined &&
      await signInWithPopup(authService, provider);
  }


  return (
    <Main>
      <AuthContainer>
        <TitleDiv>
          <TitleSpan>로그인 하기</TitleSpan>
        </TitleDiv>
        <TitleDiv>
          <LoginForm onSubmit={handleSubmit(onSubmit)}>
            <LoginInput
              {...register("userEmail", {
                required: "이메일을 입력해 주세요.",
              })}
              placeholder="이메일을 입력하세요"
              type="email"
            ></LoginInput>
            {loginError === undefined && (
              <AuthErrorM>{errors.userEmail?.message}</AuthErrorM>
            )}
            <LoginInput
              {...register("userPassword", {
                required: "비밀번호를 입력해 주세요.",
              })}
              placeholder="비밀번호를 입력하세요"
              type="password"
            ></LoginInput>
            {loginError === undefined && (
              <AuthErrorM>{errors.userPassword?.message}</AuthErrorM>
            )}
            <AuthErrorM>{loginError}</AuthErrorM>
            <LargeBtnWhite type="submit">
              <h1>이메일 로그인</h1>
            </LargeBtnWhite>
          </LoginForm>
        </TitleDiv>
        <hr></hr>
        <TitleDiv>
          <LargeBtnDark id="google" onClick={socialLogin}>
            구글 로그인
          </LargeBtnDark>
          <LargeBtnDark id="github" onClick={socialLogin}>
            깃허브 로그인
          </LargeBtnDark>
        </TitleDiv>
        <hr></hr>
        <TitleDiv>
          <Link to="../join">
            <LargeBtnDark>회원 가입</LargeBtnDark>
          </Link>
          <Link to="../findpassword">
            <LargeBtnDark>
              <h1>비밀번호 찾기</h1>
            </LargeBtnDark>
          </Link>
        </TitleDiv>
      </AuthContainer>
    </Main>
  );
};
export default AuthLogin;
