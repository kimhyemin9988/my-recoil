import { useState } from "react";
import Select from 'react-select';
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Category, Todos, IToDo } from "../Atoms";
import { SubmitInput } from "../home/CreateToDo";
import { customStyles } from "../home/CategoryAndList";

const MiniForm = styled.form`
  width:350px;
  display: flex;
  margin: 5px;
`
const AsBtnMargin = styled(SubmitInput)`
    width: fit-content;
    margin: 0px;
    margin-left:5px;
`

const TodoRender = ({ text, id, category }: IToDo) => {

  const setTodosArray = useSetRecoilState(Todos);

  /* 카테고리 변경 on off */
  const [cateSelect, setcateSelect] = useState(false);
  const togglecategories = () => {
    setcateSelect((prev) => !prev)
  }
  /* 리스트 카테고리 변경 */
  const oldCategory = useRecoilValue(Category);
  const [handleValue, setHandleValue] = useState();
  /* 선택 */
  const handleChange = (e: any) => {
    console.log(e);
    const { value } = e; // value ==  "Todo"
    setHandleValue(() => value);
  }
  /* 제출 */
  const onSubmit = (event: any) => {
    event.preventDefault();
    setTodosArray((oldArray) => {
      const targetIndex = oldArray.findIndex((item) => item.id === id);
      const newTodo = { text, id, category: handleValue as any };
      return ([...oldArray.slice(0, targetIndex),
        newTodo,
      ...oldArray.slice(targetIndex + 1)]);
    });
    togglecategories();
  }
  /* 삭제 */
  const deleteList = (event: any) => {
    event.preventDefault();
    setTodosArray((oldArray) => {
      const targetIndex = oldArray.findIndex((item) => item.id === id); 
      return ([...oldArray.slice(0, targetIndex),
      ...oldArray.slice(targetIndex + 1)]);
    });
  }

  return (
    <>
      {cateSelect ?
        (<>
          <MiniForm onSubmit={onSubmit}>
            <Select options={oldCategory}
              onChange={handleChange} // 선택한 obj return
              styles={customStyles}
            />
            <AsBtnMargin as="button" type="submit">제출</AsBtnMargin>
            <AsBtnMargin as="button" type="button" onClick={togglecategories}>취소</AsBtnMargin>
          </MiniForm>
        </>)
        : (
          <div>
            <SubmitInput as="button"
              onClick={deleteList}>삭제</SubmitInput>
            <SubmitInput as="button"
              onClick={togglecategories}>카테고리 변경
            </SubmitInput>
          </div>
          )}
    </>
  );
};

export default TodoRender;

