import { useState } from "react";
import Select from 'react-select';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Category, Todos, IToDo } from "../Atoms";

const TodoRender = ({ text, id, category }: IToDo) => {
  //선택한 목록의 아이디

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
  /* 제출 *///React.MouseEvent<HTMLButtonElement>
  const onSubmit = (event: any) => {
    event.preventDefault();
    setTodosArray((oldArray) => {
      const targetIndex = oldArray.findIndex((item) => item.id === id); //해당하는 목록의 id
      const newTodo = { text, id, category: handleValue as any };
      return ([...oldArray.slice(0, targetIndex),
        newTodo,
      ...oldArray.slice(targetIndex + 1)]);
    });
    togglecategories();
  }
  /* 삭제 */
  const deleteList = (event: any) =>{
    event.preventDefault();
    setTodosArray((oldArray) => {
      const targetIndex = oldArray.findIndex((item) => item.id === id); //해당하는 목록의 id
      return ([...oldArray.slice(0, targetIndex),
      ...oldArray.slice(targetIndex + 1)]);
    });
  }

  return (
    <>
      {cateSelect ?
        <form onSubmit={onSubmit}>
          <Select options={oldCategory}
            onChange={handleChange} // 선택한 obj return
          />
          <input type="submit" />
        </form>
        : (
          <>
            <button onClick={deleteList}>삭제</button>
            <button onClick={togglecategories}>카테고리 변경</button>
          </>)}
    </>
  );
};

export default TodoRender;
//1) id로 카테고리를 바꿀 todo를 찾기, 카테고리 변경 버튼
//2) setRecoilState를 이용하면 안의 값을 바로 바꿀 수 있음
//3)선택한 option의 value

{/* <form>
  <select onSubmit={handleSubmit(onSubmitCateOption)}>
    <option value="Todo">To-do</option>
    <option value="Doing">doing</option>
    <option value="Done">done</option>
  </select>
  <input type="submit" />
</form> */}