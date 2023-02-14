import React, { useState } from 'react';
import { IToDo, Todos} from './Atoms';
import {
  useRecoilState,
  useRecoilValue, useSetRecoilState
} from "recoil";
import { useForm } from "react-hook-form";
import CreateToDo from './CreateToDo';
import TodoRender from './TodoRender';
import EditingCate from './EditingCate';
import SelectExam from './SelectExam';



const Todo = () => {
  //text:string;
  //id:string;
  //category:string;
  //{Todos} => { Todos:Todos }라서 {}안하면 key Todos로 하는 값으로 저장됨
  return (
    <>
      <CreateToDo></CreateToDo>
      <hr />
      <SelectExam></SelectExam>
    </>
  );
}

export default Todo;
//{categories ? null : <button onClick={toggleEditing} type="button">카테고리 수정</button>}