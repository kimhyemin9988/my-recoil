import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ProfileDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`

export const ImageCircle = styled.div<{ posterbg?: string | undefined }>`
  width: 3rem;
  height: 3rem;
  background-image: url(${(props) => props.posterbg});
  background-size: 100% 100%;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.bodyFtColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileMini = () => {
  return (
    <ProfileDiv>
      <ImageCircle>
        <FontAwesomeIcon icon={faUser} />
      </ImageCircle>
    </ProfileDiv>

  );
}
export default ProfileMini;