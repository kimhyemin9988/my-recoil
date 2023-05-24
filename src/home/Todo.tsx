import CreateToDo from "./CreateToDo";
import CategoryAndList from "./CategoryAndList";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import ProfileMiniCircle from "./ProfileMini";
import { IuserData } from "../profile/Profile";
import { authService } from "../todoFirebase";

const Header = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 550px) {
    height: 50px;
  }
`;
export const Title = styled.span`
  font-size: 3rem;
  font-weight: 800;
  color: white;
  @media screen and (max-width: 550px) {
    font-size: 2rem;
  }
`;
export const Main = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Todo = () => {
  const user = authService.currentUser as IuserData;

  return (
    <>
      <Helmet>
        <title>To Do List</title>
      </Helmet>
      <Header>
        <Title>To Do List</Title>
        <ProfileMiniCircle userPhotoURL={user.photoURL}></ProfileMiniCircle>
      </Header>
      <Main>
        <CreateToDo></CreateToDo>
        <hr />
        <CategoryAndList></CategoryAndList>
      </Main>
    </>
  );
};

export default Todo;
