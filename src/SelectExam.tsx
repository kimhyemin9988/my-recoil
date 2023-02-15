import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Select from 'react-select';
import { Category, Todos } from './Atoms';
import TodoRender from './TodoRender';
import { Link } from 'react-router-dom';
const SelectExam = () => {
    const [oldCategory, setoldCategory] = useRecoilState(Category);
    const [handleValue, setHandleValue] = useState();
    const todosArray = useRecoilValue(Todos);
    // set value for default selection
    // handle onChange event of the dropdown and get value
    // React-select get value on change
    const handleChange = (e: any) => {
        const { value } = e; // value ==  "Todo"
        setHandleValue(() => value);
    }
    return (
        <>
            <Select options={oldCategory}
                onChange={handleChange} // 선택한 obj return
            />
            <button type="button">
                <Link to="category">카테고리 목록 수정</Link>
            </button>
            <hr />
            <ul>
                {todosArray && todosArray.map((toDo) => {
                    const { category } = toDo;
                    if (handleValue === category)
                        return (
                            <li key={toDo.id}>{toDo.text}
                                <TodoRender {...toDo}></TodoRender>
                            </li>);
                })}
            </ul>
        </>
    );//handleChange={handleChange} 오류
}
export default SelectExam;
//이 제네릭은 prop을 입력하려고 할 때 유용합니다.formatGroupLabel
// <TodoRender></TodoRender>