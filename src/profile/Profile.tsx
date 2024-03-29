import { Main } from "../home/Todo";
import {
  AuthContainer,
  LargeBtnWhite,
  TitleDiv,
  TitleSpan,
} from "../AuthLogin";
import { ImageCircle } from "../home/ProfileMini";
import styled from "styled-components";
import { authService } from "../todoFirebase";
import { useState, useEffect } from "react";
import ProfileImgChange from "./PhotoURLUpdate";
import { useNavigate } from "react-router-dom";
import DeleteUser from "./DeleteUser";

export const ImageCircleBig = styled(ImageCircle)`
  width: 6rem;
  height: 6rem;
  cursor: 0;
`;

export interface IuserData {
  email: string;
  displayName: string;
  phoneNumber: string;
  photoURL: string;
  emailVerified: boolean;
  uid: string;
}

const ProfileImageBtnDiv = styled.div`
  width: 120px;
  height: 20px;
  background-color: #13a4ff;
  color: white;
  cursor: pointer;
  border-radius: 0.3rem;
  font-weight: 500;
  text-align: center;
  margin: 10px;
  padding: 5px;
`;

const ProfileImageBtnInput = styled.input`
  position: absolute;
  left: 0;
  top: 2px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  width: 120px;
  height: 20px;
  margin: -1px;
  padding: 0;
  border: 0;
  cursor: pointer;
`;

interface IFileReader {
  onloadend: (element: any) => void;
  readAsDataURL(theFile: File): unknown;
}

const Profile = () => {
  const navigator = useNavigate();

  const user = authService.currentUser as IuserData;
  const [attach, setAttach] = useState("");
  const [changeImg, setChangeImg] = useState(false);

  useEffect(() => {
    if (user !== null) {
      setAttach((prev) => (prev = user.photoURL));
    }
  }, []);

  const onFile: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { files },
    } = event;
    if (files) {
      const theFile = files[0];
      const reader = new FileReader() as IFileReader;
      reader.onloadend = (element) => {
        const {
          currentTarget: { result },
        } = element;
        setAttach((attach) => (attach = result));
      };
      reader.readAsDataURL(theFile);
    }
    setChangeImg((prev) => (prev = true));
  };

  return (
    <Main>
      <AuthContainer>
        <TitleDiv>
          <TitleSpan>내프로필</TitleSpan>
        </TitleDiv>
        <Main>
          <ImageCircleBig as="img" src={attach}></ImageCircleBig>
          <ProfileImageBtnDiv>
            <label htmlFor="uploadfile">
              <span>사진 올리기</span>
            </label>
            <ProfileImageBtnInput
              id="uploadfile"
              type="file"
              accept="image/*"
              onChange={onFile}
            ></ProfileImageBtnInput>
          </ProfileImageBtnDiv>
          <h1>{user.displayName}</h1>
          <h1>{user.email}</h1>
          <TitleDiv>
            <ProfileImgChange
              attach={attach}
              changeImg={changeImg}
              userUid={user.uid}
            ></ProfileImgChange>
            <LargeBtnWhite as="button" onClick={() => navigator("/home")}>
              취소
            </LargeBtnWhite>
          </TitleDiv>
          <DeleteUser></DeleteUser>
        </Main>
      </AuthContainer>
    </Main>
  );
};
export default Profile;
