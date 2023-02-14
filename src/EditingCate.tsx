import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Category } from './Atoms';

export interface categories {
  Category: string;
  /*   categories:string; */
}

const EditingCate = () => {
  const { register, watch, handleSubmit, formState: { errors } } = useForm<categories>();
  const [oldCategory, setoldCategory] = useRecoilState(Category);
  const [cateLi, setcateLi] = useState(false);
  const toggleEditing = () => setcateLi((prev) => !prev);
  /* output : form의 모든 객체 */
  /*   console.log(register("Todos"))   output : {name: 'Todos', onChange: ƒ, onBlur: ƒ, ref: ƒ};
    console.log(watch("Todos"));    output : 사과*/
  const onSubmitCate = ( {Category} : any) => {
    setoldCategory((oldCategory) => (
      [{ value: Category, label: Category }, ...oldCategory]
    ));
  }
  console.log(oldCategory);

  return (
    <>
      {cateLi ? (
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
      ) : <button onClick={toggleEditing} type="button">카테고리 목록 수정</button>}
    </>
  );
}
export default EditingCate;