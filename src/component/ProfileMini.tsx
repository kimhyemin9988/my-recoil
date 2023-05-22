import styled from "styled-components";
import { useState } from "react";
import { authService } from "../todoFirebase";
import { Link, useNavigate } from "react-router-dom";


export const ProfileDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;
  @media screen and (max-width: 550px){
    margin: 0.5rem;
    }
`

export const ImageCircle = styled.div<{ posterbg?: string | undefined }>`
  width: 3rem;
  height: 3rem;
  background-image: url(${(props) => props.posterbg});
  background-size: 100% 100%;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.bodyFtColor};
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background-color: white;
  @media screen and (max-width: 550px){
    width: 2rem;
    height: 2rem;
    }
`;


export const ProfileNavContainer = styled.div`
    width: 5rem;
    background-color: white;
    border-radius: 0.4rem;
    box-shadow: 1px 1px 1px rgb(0 0 0 / 40%);
    padding: 0.5rem;
    position: absolute;
    top: 4rem;
    right: 0;
    @media screen and (max-width: 550px){
        top: 3rem;
        padding: 0.3rem;
    }
`

export const ProfileNavDiv = styled.div`
    text-align: center;
    cursor: pointer;
    &:hover{
        background-color: #d2d2d2ea;
    }
`

const ProfileMini = ({ userPhotoURL } : { userPhotoURL: string }) => {
  const navigate = useNavigate();
  const [profileNav, setProfileNav] = useState(false);
  const cycleProfileNav = () => {
    setProfileNav((prev) => !prev);
  }

  const onLogOut = () => {
    authService.signOut();
    navigate("/");
  };

  return (
    <ProfileDiv>
      <ImageCircle as="img" src={`${userPhotoURL}`} onClick={cycleProfileNav}>
      </ImageCircle>
      {profileNav &&
        <ProfileNavContainer>
          <ProfileNavDiv onClick={onLogOut}>
            <span>로그아웃</span>
          </ProfileNavDiv>
          <Link to="../profile">
            <ProfileNavDiv>
              <span>내프로필</span>
            </ProfileNavDiv>
          </Link>
        </ProfileNavContainer>
      }
    </ProfileDiv>

  );
}
export default ProfileMini;