import styled from "styled-components";
import { AuthContainer, AuthInputDiv, LargeBtnDark } from "../AuthLogin";
import { MiniCheckI } from "./MiniCheck";
import { Main } from "../home/Todo";

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  z-index: 10;
  background-color: #3e3636c5;
`;

interface modalI extends MiniCheckI{
    setCycle : React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ text, setCycle }: modalI, ) => {
    return (
        <Overlay>
            <AuthContainer style={{ position: "fixed" }}>
                <AuthInputDiv style={{ margin: "3rem 0.3rem" }}>
                    <Main>
                        {text.map((e: string) => (
                            <h1 key={e}>{e}</h1>
                        ))}
                        <LargeBtnDark
                            onClick={() => {
                                setCycle((prev) => prev = false);
                            }}
                            type="button" style={{ margin: "2rem 0" }}
                        >
                            확인
                        </LargeBtnDark>
                    </Main>
                </AuthInputDiv>
            </AuthContainer>
        </Overlay>
    );
}
export default Modal;
