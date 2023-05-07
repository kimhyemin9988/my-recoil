import styled from "styled-components";
import { Main } from "./Todo";
import { Container, SubmitInput, TodoInput } from "./component/CreateToDo";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const LoginTitle = styled.span`
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
export const LoginSubmit2 = styled(SubmitInput)`
    width: 100px;
    height: 30px;
    background-color: #503F47;
    color: white;
`
export const LoginDiv = styled.div`
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
    const onSubmit = (data: LoginI) => console.log(data);
    return (

        <Main>
            <AuthContainer>
                <LoginDiv>
                    <LoginTitle>로그인 하기</LoginTitle>
                </LoginDiv>
                <LoginDiv>
                    <LoginForm onSubmit={handleSubmit(onSubmit)}>
                        <LoginInput {...register("userEmail", { required: true })} placeholder="이메일을 입력하세요" type="email"></LoginInput>
                        {errors.userEmail && <span>이메일을 입력해 주세요.</span>}
                        <LoginInput {...register("userPassword", { required: true })} placeholder="비밀번호를 입력하세요" type="password"></LoginInput>
                        {errors.userPassword && <span>비밀번호를 입력해 주세요.</span>}
                        <LoginSubmit as="button" type="submit">
                            <h1>이메일 로그인</h1>
                        </LoginSubmit>
                    </LoginForm>
                </LoginDiv>
                <hr></hr>
                <LoginDiv>
                    <LoginSubmit2 as="button" type="button">
                        <h1>구글 로그인</h1>
                    </LoginSubmit2>
                    <LoginSubmit2 as="button" type="button">
                        <h1>깃허브 로그인</h1>
                    </LoginSubmit2>
                </LoginDiv>
                <hr></hr>
                <LoginDiv>
                    <LoginSubmit2 as="button" type="button">
                        <Link to="join">회원 가입</Link>
                    </LoginSubmit2>
                    <LoginSubmit2 as="button" type="button">
                        <h1>비밀번호 찾기</h1>
                    </LoginSubmit2>
                </LoginDiv>
            </AuthContainer>
        </Main>
    );
};
export default AuthLogin;

