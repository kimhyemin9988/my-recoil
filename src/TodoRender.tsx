import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { Todos } from "./Atoms";
import { categories } from "./EditingCate";

const TodoRender = () => {
  const todosArray = useRecoilValue(Todos);
  console.log(todosArray);
  const [cateSelect, setcateSelect] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<categories>();
  const togglecategories = () => {
    setcateSelect((prev) => !prev)
  }
  const onSubmitCateOption = () => {

  }
  return (
    <>
      <h1>To Dos</h1>
      <ul>
        {todosArray && todosArray.map((toDo) => {
          return (
            <li key={toDo.id}>{toDo.text}
              {cateSelect ?
                <form>
                  <select onSubmit={handleSubmit(onSubmitCateOption)}>
                    <option value="Todo">To-do</option>
                    <option value="Doing">doing</option>
                    <option value="Done">done</option>
                  </select>
                  <input type="submit" />
                </form> : (<button onClick={togglecategories}>카테고리 변경</button>)}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TodoRender;
//1) id로 카테고리를 바꿀 todo를 찾기, 카테고리 변경 버튼
//2) setRecoilState를 이용하면 안의 값을 바로 바꿀 수 있음
//3)선택한 option의 value