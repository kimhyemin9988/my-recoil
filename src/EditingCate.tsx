import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Category } from './Atoms';
import Select from 'react-select';

export interface categories {
  Category: string;
  /*   categories:string; */
}

const EditingCate = () => {
  const { register, watch, handleSubmit, formState: { errors } } = useForm<categories>();
  const [oldCategory, setoldCategory] = useRecoilState(Category);
  const [cateLi, setcateLi] = useState(false);
  const [addBoolean, setaddCategory] = useState(false);
  const [deleteBoolean, setdeleteCategory] = useState(false);
  const toggleEditing = () => setcateLi((prev) => !(prev));

  /* output : form의 모든 객체 */
  /*   console.log(register("Todos"))   output : {name: 'Todos', onChange: ƒ, onBlur: ƒ, ref: ƒ};
    console.log(watch("Todos"));    output : 사과*/
  const onSubmitCate = ({ Category }: any) => {
    setoldCategory((oldCategory) => {
      return (
        [{ value: Category, label: Category }, ...oldCategory]);
    });
    toggleEditing();
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
    setoldCategory((oldArray) => {
      const targetIndex = oldArray.findIndex((item) => item.value === handleValue);
      return ([...oldArray.slice(0, targetIndex),
      ...oldArray.slice(targetIndex + 1)]);
    });
    deleteCategory();
  }

  return (
    <>
      {cateLi ?
        <>
          {addBoolean ?
            <form onSubmit={handleSubmit(onSubmitCate)}>
              <input placeholder=
                "추가할 카테고리를 입력하세요" {...register("Category", {
                  required: {
                    value: true,
                    message: "공백을 입력할 수 없습니다",
                  },
                })}></input>
              <input type="submit" />
              <button onClick={toggleEditing}>Cancel</button>
              <span>{errors.Category?.message}</span>
            </form>
            : <button onClick={addCategory}>카테고리 추가</button>}
          {deleteBoolean ?
            <>
              <h4>삭제할 카테고리를 선택하세요</h4>
              <form onSubmit={onSubmit}>
                <Select options={oldCategory}
                  onChange={handleChange} // 선택한 obj return
                />
                <input type="submit" />
              </form>
            </>
            : <button onClick={deleteCategory}>카테고리 삭제</button>}
        </> : (<button onClick={toggleEditing} type="button">카테고리 목록 수정</button>)}
    </>
  );
}
export default EditingCate;
//목록안에 list가 있는 경우 카테고리를 삭제 할 수 없음
//카테고리 삭제나 추가 시 다른 페이지로 이동 후 제출하면 홈페이지로 돌아오도록