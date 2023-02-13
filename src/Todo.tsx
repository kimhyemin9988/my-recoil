import React from 'react';
import { IToDo, Todos } from './Atoms';
import {
  useRecoilState,
  useRecoilValue, useSetRecoilState
} from "recoil";
import { useForm } from "react-hook-form";
interface formDate {
  Todos: string;
/*   categories:string; */
}

const Todo = () => {
  const [todosArray, setTodosArray] = useRecoilState(Todos);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<formDate>();
  //text:string;
  //id:string;
  //category:string;
  //{Todos} => { Todos:Todos }라서 {}안하면 key Todos로 하는 값으로 저장됨
    const onSubmit = ({Todos} : any) => {
    //새로운 입력값 newTodo는 text
    setTodosArray((oldTodos) =>(
      //이전에 저장된 값 value
      [{text:Todos, id: Date.now(), categoriesOption:"Todo"}, ...oldTodos]
    ));
    setValue("Todos","");
  };
  /* output : form의 모든 객체 */
  /*   console.log(register("Todos"))   output : {name: 'Todos', onChange: ƒ, onBlur: ƒ, ref: ƒ};
    console.log(watch("Todos"));    output : 사과*/
  return (
    <>
     {/*  <section {...register("categories")}>
        <option value="To-do">To-do</option>
        <option value="doing">doing</option>
        <option value="done">done</option>
      </section> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder=
          "할일을 입력하세요" {...register("Todos", {
            required: {
              value: true,
              message: "필수로 입력해야 하는 값입니다",
            },
          }
          )}></input>
        <input type="submit" />
        <span>{errors.Todos?.message}</span>
      </form>
      <ul>
        {todosArray && todosArray.map((toDo)=>{
          return(
            <li key={toDo.id}>{toDo.text}</li>
          );
        })}
      </ul>
    </>
  );
}

export default Todo;
