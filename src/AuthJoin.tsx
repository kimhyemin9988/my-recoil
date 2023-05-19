import styled from "styled-components";
import { Main } from "./Todo";
import { useForm } from "react-hook-form";
import { AuthContainer, AuthErrorM, AuthInputDiv, FormLabel, LoginDiv, LoginForm, LoginI, LoginInput, LoginSubmit, LoginTitle } from "./AuthLogin";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authService } from "./todoFirebase";
import { useState } from "react";
import MiniCheck from "./component/MiniCheck";

interface JoinI extends LoginI {
    passwordConfirm: string,
    userName: string,
};


const AuthJoin = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<JoinI>();

    const onSubmit = async (data: JoinI) => {
        if (data.userPassword !== data.passwordConfirm) {
            setError("passwordConfirm", { message: "동일한 비밀번호를 입력하세요." });
        }
        try {
            let createData;
            createData = await createUserWithEmailAndPassword(authService, data.userEmail, data.userPassword);
            //회원가입 즉시 로그인됨.
            alert("회원가입에 성공했습니다");
        } catch (error: any) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    return "이미 사용 중인 이메일입니다.";
                case "auth/network-request-failed":
                    return "네트워크 연결에 실패 하였습니다.";
                default:
                    return "회원가입에 실패 하였습니다.";
            }
        }
    }

    return (
        <Main>
            <AuthContainer>
                <LoginDiv>
                    <LoginTitle>회원가입 하기</LoginTitle>
                </LoginDiv>
                <LoginDiv>
                    <LoginForm onSubmit={handleSubmit(onSubmit)}>
                        <AuthInputDiv>
                            <FormLabel htmlFor="userName">이름</FormLabel>
                            <LoginInput maxLength={20} id="userName" {...register("userName", {
                                required: "이름을 입력해 주세요.", maxLength: {
                                    value: 20,
                                    message: "앞에서 부터 20자 까지만 이름을 입력해 주세요."
                                }
                            })} placeholder="이름을 입력하세요" type="text"></LoginInput>
                            <AuthErrorM>{errors.userName?.message}</AuthErrorM>
                        </AuthInputDiv><AuthInputDiv>
                            <FormLabel htmlFor="userEmail">이메일</FormLabel>
                            <LoginInput id="userEmail" {...register("userEmail", {
                                required: "이메일을 입력해 주세요.",
                                pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@+[a-z]+.+[a-z]/,
                                    message: "이메일 형식으로 입력해주세요."
                                },
                            })} placeholder="예:todo@google.com" type="email"></LoginInput>
                            <AuthErrorM>{errors.userEmail?.message}</AuthErrorM>
                        </AuthInputDiv><AuthInputDiv>
                            <FormLabel htmlFor="userPassword">비밀번호</FormLabel>
                            <LoginInput minLength={8} maxLength={16} id="userPassword" {...register("userPassword", {
                                required: "비밀번호를 입력해 주세요.",
                                pattern: {
                                    value: /^[A-Za-z0-9]/,
                                    message: "8~16자 영문 대 소문자, 숫자를 사용하세요."
                                },
                                minLength: {
                                    value: 8,
                                    message: "8~16자 영문 대 소문자, 숫자를 사용하세요."
                                }
                            })} placeholder="비밀번호를 입력하세요" type="password"></LoginInput>
                            <AuthErrorM>{errors.userPassword?.message}</AuthErrorM>
                        </AuthInputDiv><AuthInputDiv>
                            <FormLabel htmlFor="passwordConfirm">비밀번호 확인</FormLabel>
                            <LoginInput minLength={8} maxLength={16} id="passwordConfirm" {...register("passwordConfirm", {
                                required: "비밀번호를 한번 더 입력하세요.",
                            })} placeholder="비밀번호를 한번 더 입력하세요." type="password"></LoginInput>
                            <AuthErrorM>{errors.passwordConfirm?.message}</AuthErrorM>
                        </AuthInputDiv><LoginSubmit as="button" type="submit">
                            <h1>회원 가입</h1>
                        </LoginSubmit>
                    </LoginForm>
                </LoginDiv>
            </AuthContainer>
        </Main>
    );
};

export default AuthJoin;