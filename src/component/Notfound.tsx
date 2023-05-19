import { Link } from "react-router-dom";
import { GlobalStyle } from "../App";
import { AuthContainer, AuthErrorM, AuthInputDiv, LoginDiv, LoginSubmit2 } from "../AuthLogin";
import { Main } from "../Todo";
import styled from "styled-components";


const NotFound = () => {
    return (
        <>
            <GlobalStyle />
            <Main>
                <AuthContainer>
                    <AuthInputDiv style={{ margin: "3rem 0.3rem" }}>
                        <Main>
                            <h1>요청하신 페이지를 찾을 수 없습니다.</h1>
                            <h1>입력하신 경로가 정확한지</h1>
                            <h1>다시 한번 확인해 주시기 바랍니다.</h1>
                            <LoginSubmit2 type="button" style={{ margin: "2rem 0" }}>
                                <Link to="../login">확인</Link>
                            </LoginSubmit2>
                        </Main>
                    </AuthInputDiv>
                </AuthContainer>
            </Main>
        </>
    );
}
export default NotFound;