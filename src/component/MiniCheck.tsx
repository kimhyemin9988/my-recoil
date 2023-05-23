import { Link } from "react-router-dom";
import { GlobalStyle } from "../App";
import {  AuthInputDiv, LargeBtnDark } from "../AuthLogin";
import { Main } from "../home/Todo";
import styled from "styled-components";

interface MiniCheckI {
    text: string[];
}

const MiniCheck = ({ text }: MiniCheckI) => {
    return (
        <AuthInputDiv style={{ margin: "3rem 0.3rem" }}>
            <Main>
                {text.map((e: string) => <h1 key={e}>{e}</h1>)}
                <Link to="">
                    <LargeBtnDark type="button" style={{ margin: "2rem 0" }}>
                        확인
                    </LargeBtnDark>
                </Link>
            </Main>
        </AuthInputDiv>
    );
}
export default MiniCheck;
