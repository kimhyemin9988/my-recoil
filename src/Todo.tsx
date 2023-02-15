import CreateToDo from './component/CreateToDo';
import SelectCategory from './component/SelectCategory';
import styled from 'styled-components';
import { Helmet } from "react-helmet";

const Header = styled.header`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Title = styled.span`
    font-size: 3rem;
    margin: 7%;
    font-weight: 800;
    color: white;
`
const Main = styled.div`
    width: 100%;
    height: 100vh;
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
        <SelectCategory></SelectCategory>
      </Main>
    </>
  );
}

export default Todo;