import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Category, Todos } from '../Atoms';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import { AsBtn } from './CategoryAndList';
import { Container } from './CreateToDo';
import { Main } from "../Todo";
export interface categories {
  Category: string;
  /*   categories:string; */
}

const EditingCategory = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<categories>();
  const [oldCategory, setoldCategory] = useRecoilState(Category);
  const [addBoolean, setaddCategory] = useState(false);
  const [deleteBoolean, setdeleteCategory] = useState(false);

  const todosArray = useRecoilValue(Todos);

  /* output : form의 모든 객체 */
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
    if (todosArray.filter((item) => item.category === handleValue).length !== 0) {
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
          {/* 목록안에 element가 있는 경우 카테고리를 삭제 할 수 없음 */}
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