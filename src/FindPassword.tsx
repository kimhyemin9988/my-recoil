import { useForm } from "react-hook-form";
import { AuthContainer, AuthErrorM, AuthInputDiv, LargeBtnWhite, LoginForm, LoginInput, TitleDiv, TitleSpan } from "./AuthLogin";
import { Main } from "./home/Todo";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { sendPasswordResetEmail } from "firebase/auth";
import { authService } from "./todoFirebase";
import Modal from "./component/Modal";

const DisableBtn = styled(LargeBtnWhite) <{ disabled?: boolean }>`
    background-color: ${(props) => (props.disabled ? `#acacac` : `white`)};
    color: ${(props) => (props.disabled ? `white` : `#503F47`)};
    border: 1px solid ${(props) => (props.disabled ? `white` : `#503F47`)};
`


const FindPassword = () => {
    const [activeBtn, setactiveBtn] = useState(false);
    const [emailResponseError, setemailResponseError] = useState([""]);

    const [cycle, setCycle] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        watch,
        setError,
    } = useForm<{ userEmail: string }>();

    const sendEmail = async (data: { userEmail: string }) => {
        try {
            await sendPasswordResetEmail(authService, data.userEmail);
        } catch (error: any) {
            const errorMessage = ((error: any) => {
                switch (error.code) {
                    case "auth/invalid-email":
                        return ["존재하지 않는 이메일 입니다."];
                    case "auth/network-request-failed":
                        return ["네트워크 연결에 실패 하였습니다."];
                    default:
                        return ["비밀번호 재설정 이메일을 보내는 것에 실패 하였습니다.", "다시 한 번 시도해 주세요."];
                }
            })(error);
            setemailResponseError((prev) => prev = errorMessage);
            setCycle((prev) => prev = true);
        }
    };

    const onBlurError = () => {
        const emailValue = getValues("userEmail");
        const regexpEmail = /[A-Za-z0-9_]+[@]+[A-Za-z]+[.]+[A-Za-z0-9]/;
        emailValue.length === 0 && setError("userEmail", { message: "회원가입시 입력한 이메일을 입력해 주세요." });
        if (emailValue.match(regexpEmail) === null) {
            setError("userEmail", { message: "이메일 형식으로 입력해 주세요" });
            setactiveBtn((prev) => prev = true);
        };
    }

    /* 유효성 검사 통과 못할 시 비활성화 */
    useEffect(() => {
        watch('userEmail').length === 0 ? setactiveBtn((prev) => prev = true) : setactiveBtn((prev) => prev = false);
    }, [watch('userEmail')])

    return (
        <Main>
            {cycle && <Modal text={emailResponseError} setCycle={setCycle}></Modal>}
            <AuthContainer>
                <TitleDiv>
                    <TitleSpan>비밀번호 찾기</TitleSpan>
                </TitleDiv>
                <TitleDiv>
                    <LoginForm onSubmit={handleSubmit(sendEmail)} onBlur={onBlurError}>
                        <LoginInput
                            {...register("userEmail")}
                            placeholder="이메일을 입력하세요"
                        ></LoginInput>
                        <AuthErrorM>{errors.userEmail?.message}</AuthErrorM>
                        <DisableBtn disabled={activeBtn} type="submit">
                            <h1>비밀번호 재설정</h1>
                        </DisableBtn>
                    </LoginForm>
                </TitleDiv>
            </AuthContainer>
        </Main>
    );
};
export default FindPassword;
//이메일이 서버에 있어야 보낼 수 있음!