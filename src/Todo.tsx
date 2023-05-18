import CreateToDo from './component/CreateToDo';
import CategoryAndList from './component/CategoryAndList';
import styled from 'styled-components';
import { Helmet } from "react-helmet";
import { Outlet } from 'react-router-dom';

const Header = styled.header`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 550px){
      height: 50px;
    }
`
export const Title = styled.span`
    font-size: 3rem;
    margin: 7%;
    font-weight: 800;
    color: white;
    @media screen and (max-width: 550px){
      font-size: 2rem;
    }
`
export const Main = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`
const Todo = () => {
  return (
    <>
      <Helmet>
        <title>To Do List</title>
      </Helmet>
      <Header>
        <Title>To Do List</Title>
      </Header>
      <Main>
            <CreateToDo></CreateToDo>
            <hr />
            <CategoryAndList></CategoryAndList>
        </Main>
    </>
  );
}

export default Todo;