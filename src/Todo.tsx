import React, { useState } from 'react';
import { IToDo, Todos } from './Atoms';
import {
  useRecoilState,
  useRecoilValue, useSetRecoilState
} from "recoil";
import { useForm } from "react-hook-form";
import CreateToDo from './CreateToDo';
import TodoRender from './TodoRender';
import EditingCate from './EditingCate';



const Todo = () => {
  //text:string;
  //id:string;
  //category:string;
  //{Todos} => { Todos:Todos }라서 {}안하면 key Todos로 하는 값으로 저장됨
  return (
    <>
      <EditingCate></EditingCate>
      <hr />
      <CreateToDo></CreateToDo>
      <hr />
      <select>
        <option value="Todo">To-do</option>
        <option value="Doing">doing</option>
        <option value="Done">done</option>
      </select>
      <TodoRender></TodoRender>
    </>
  );
}

export default Todo;
//{categories ? null : <button onClick={toggleEditing} type="button">카테고리 수정</button>}