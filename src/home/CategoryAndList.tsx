import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Select, { SingleValue } from "react-select";
import { Category, ICategory, Todos } from "../Atoms";
import TodoRender from "../component/TodoRender";
import { Link } from "react-router-dom";
import { SubmitInput, Container } from "./CreateToDo";
import styled from "styled-components";
import collectionGet from "./collectionGet";

const MainContainer = styled(Container)`
  width: 80%;
  @media screen and (max-width: 550px) {
    margin-top: 0.1rem;
    width: 90%;
    padding: 0.4rem;
    min-height: 50vh;
  }
`;

export const AsBtn = styled(SubmitInput)`
  width: 100px;
`;
const Ul = styled.ul`
  background-color: #fbedff;
  border-radius: 0.3rem;
  margin-top: 10px;
  padding: 5px;
  min-height: 100px;
  text-align: center;
  @media screen and (max-width: 550px) {
    min-height: 40vh;
  }
`;
const Li = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
const TodoP = styled.p`
  font-size: 15px;
  font-weight: 700;
  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;
export const customStyles = {
  control: (base: any) => ({
    ...base,
    height: 25,
    minHeight: 25,
    alignContent: "center",
    width: 160,
  }),
  valueContainer: (base: any) => ({
    ...base,
    alignItems: "center",
  }),
  menuList: (base: any) => ({
    ...base,
    color: "black",
  }),
};

const CategoryAndList = ({ userId }: { userId: string }) => {
  const oldCategory = useRecoilValue(Category);
  const [handleValue, setHandleValue] = useState<string>();
  
  const [todosArray, setTodosArray] = useRecoilState(Todos);

  const handleChange = async (e: SingleValue<ICategory>) => {
    const value = e?.value; // value ==  "Todo"
    setHandleValue((prev) => prev = value);
    //data 가져오기
    collectionGet(value, userId, setTodosArray);
  };
  return (
    <>
      <MainContainer>
        <Link to="../category">
          <AsBtn as="button" type="button">
            카테고리 목록 <br></br>수정
          </AsBtn>
        </Link>
        <Select
          options={oldCategory}
          onChange={handleChange} // 선택한 obj return
        />
        <Ul>
          {todosArray &&
            todosArray.map((toDo) => {
              const { category } = toDo;
              if (handleValue === category)
                return (
                  <Li key={toDo.id}>
                    <TodoP>{toDo.text}</TodoP>
                    <TodoRender {...toDo}></TodoRender>
                  </Li>
                );
            })}
        </Ul>
      </MainContainer>
    </>
  );
};
export default CategoryAndList;
