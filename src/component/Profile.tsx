import { Main } from "../Todo";
import { AuthContainer, TitleDiv, TitleSpan } from "../AuthLogin";
import { ImageCircle } from "./ProfileMini";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";


export const ImageCircleBig = styled(ImageCircle)`
  width: 6rem;
  height: 6rem;
  cursor: 0;
  @media screen and (max-width: 550px){
    width: 4rem;
    height: 4rem;
    }
`;

const Profile = () => {

    return (
        <Main>
            <AuthContainer>
                <TitleDiv>
                    <TitleSpan>내프로필</TitleSpan>
                </TitleDiv>
                <ImageCircleBig>
                    <FontAwesomeIcon icon={faUser} />
                </ImageCircleBig>
            </AuthContainer>
        </Main>
    );
}
export default Profile;