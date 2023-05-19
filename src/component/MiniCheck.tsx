import { Link } from "react-router-dom";
import { GlobalStyle } from "../App";
import { AuthContainer, AuthErrorM, AuthInputDiv, LoginDiv, LoginSubmit2 } from "../AuthLogin";
import { Main } from "../Todo";
import styled from "styled-components";

interface MiniCheckI {
    text: string[];
}

const MiniCheck = ({ text }: MiniCheckI) => {
    return (
        <AuthInputDiv style={{ margin: "3rem 0.3rem" }}>
            <Main>
                {text.map((e: string) => <h1 key={e}>{e}</h1>)}
                <LoginSubmit2 type="button" style={{ margin: "2rem 0" }}>
                    <Link to="">확인</Link>
                </LoginSubmit2>
            </Main>
        </AuthInputDiv>
    );
}
export default MiniCheck;
