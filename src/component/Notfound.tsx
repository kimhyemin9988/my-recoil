import MiniCheck from "./MiniCheck";
import { GlobalStyle } from "../App";
import { Main } from "../home/Todo";
import { AuthContainer } from "../AuthLogin";
const NotFound = () => {
  const NotFountMessage = [
    "요청하신 페이지를 찾을 수 없습니다.",
    "입력하신 경로가 정확한지",
    "다시 한번 확인해 주시기 바랍니다.",
  ];

  return (
    <>
      <GlobalStyle />
      <Main>
        <AuthContainer>
          <MiniCheck text={NotFountMessage}></MiniCheck>
        </AuthContainer>
      </Main>
    </>
  );
};
export default NotFound;
