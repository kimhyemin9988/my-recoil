import React from 'react';
import { Todos } from './Atoms';
import {
  useSetRecoilState
} from "recoil";
import { useForm } from "react-hook-form";

const Todo = () => {
  const setTodos = useSetRecoilState(Todos);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data:any) => console.log(data);
  console.log(watch());
  console.log(register("Todos"));
  return (
    <>
      <section {...register("categories")}>
        <option value="To-do">To-do</option>
        <option value="doing">doing</option>
        <option value="done">done</option>
      </section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder=
          "할일을 입력하세요" {...register("Todos", { required: true })} ></input>
        <input type="submit" />
      </form>
    </>
  );
}

export default Todo;