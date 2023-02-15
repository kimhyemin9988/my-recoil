import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Category, Todos } from '../Atoms';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import Todo from '../Todo';
import { AsBtn } from './CategoryAndList';
import { Container } from './CreateToDo';
import { Main } from "../Todo";
export interface categories {
  Category: string;
  /*   categories:string; */
}

const EditingCategory = () => {
  const navigate = useNavigate();
  const { register, watch, handleSubmit, formState: { errors }, setValue } = useForm<categories>();
  const [oldCategory, setoldCategory] = useRecoilState(Category);
  const [addBoolean, setaddCategory] = useState(false);
  const [deleteBoolean, setdeleteCategory] = useState(false);

  const [todosArray, setTodosArray] = useRecoilState(Todos);

  /* output : form의 모든 객체 */
  /*   console.log(register("Todos"))   output : {name: 'Todos', onChange: ƒ, onBlur: ƒ, ref: ƒ};
    console.log(watch("Todos"));    output : 사과*/
  const onSubmitCate = ({ Category }: any) => {
    setoldCategory((oldCategory) => {
      return (
        [{ value: Category, label: Category }, ...oldCategory]);
    });
    setValue("Category", "");
    addCategory();
  }
  /* 카테고리 추가 */
  const addCategory = () => {
    setaddCategory((prev) => !(prev));
  }
  /* 카테고리 삭제 */
  const deleteCategory = () => {
    setdeleteCategory((prev) => !(prev));
  }

  /* 리스트 카테고리 변경 */
  const [handleValue, setHandleValue] = useState();
  /* 삭제할 카테고리 선택 */
  const handleChange = (e: any) => {
    console.log(e);
    const { value } = e; // value ==  "Todo"
    setHandleValue(() => value);
  }
  /* 삭제할 카테고리 제출 */
  const onSubmit = (event: any) => {
    event.preventDefault();
    //*error, 필터하면 빈 배열이 남아있어 !==null로 하면 전부 true가 됨
    if (todosArray.filter((item) => item.category == handleValue).length !== 0) {
      alert("해당하는 카테고리 안에 목록이 있습니다! 삭제할 수 없습니다");
      navigate("/");
    }
    else {
      setoldCategory((oldArray) => {
        const targetIndex = oldArray.findIndex((item) => item.value === handleValue);
        return ([...oldArray.slice(0, targetIndex),
        ...oldArray.slice(targetIndex + 1)]);
      });
    }
    deleteCategory();
  }

  return (
    <>
      <Main>
        <Container>
          <AsBtn as="button">
            <Link to="/">홈으로</Link>
          </AsBtn>
          {addBoolean ?
            <form onSubmit={handleSubmit(onSubmitCate)}>
              <input placeholder=
                "추가할 카테고리를 입력하세요" {...register("Category", {
                  required: {
                    value: true,
                    message: "공백을 입력할 수 없습니다",
                  },
                })}></input>
              <AsBtn as="button" type="submit">추가</AsBtn>
              <AsBtn as="button" onClick={addCategory}>추가 취소</AsBtn>
              <span>{errors.Category?.message}</span>
            </form>
            : <AsBtn as="button" onClick={addCategory}>카테고리 추가</AsBtn>}
          {deleteBoolean ?
            <>
              <h4>삭제할 카테고리를 선택하세요</h4>
              <form onSubmit={onSubmit}>
                <Select options={oldCategory}
                  onChange={handleChange} // 선택한 obj return
                />
                <AsBtn as="button" type="submit">삭제</AsBtn>
                <AsBtn as="button" onClick={deleteCategory}>삭제취소</AsBtn>
              </form>
            </>
            : <AsBtn as="button" onClick={deleteCategory}>카테고리 삭제</AsBtn>}
        </Container>
      </Main>
    </>
  );
}
export default EditingCategory;
//목록안에 list가 있는 경우 카테고리를 삭제 할 수 없음
//카테고리 삭제나 추가 시 다른 페이지로 이동 후 제출하면 홈페이지로 돌아오도록