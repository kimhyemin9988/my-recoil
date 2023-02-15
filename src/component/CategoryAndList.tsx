import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Select from 'react-select';
import { Category, Todos } from '../Atoms';
import TodoRender from './TodoRender';
import { Link } from 'react-router-dom';
import { SubmitInput } from "./CreateToDo";
import styled from 'styled-components';
import { Container } from "./CreateToDo";

const MainContainer = styled(Container)`
    width: 80%;
`

export const AsBtn = styled(SubmitInput)`
    width: 100px;
`
const Ul = styled.ul`
    background-color: #fbedff;
    border-radius: 0.3rem;
    cursor: pointer;
    margin-top: 10px;
    padding: 5px;
    min-height: 100px;
    text-align: center;
`
const Li = styled.li`
    display: flex;
    flex-wrap: wrap;
`
const TodoP = styled.p`
    font-size: 15px;
    font-weight: 700;
`
const CategoryAndList = () => {
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
            <MainContainer>
                <AsBtn as="button" type="button">
                    <Link to="category">카테고리 목록 <br></br>수정</Link>
                </AsBtn>
                <Select options={oldCategory}
                    onChange={handleChange} // 선택한 obj return
                />
                <Ul>
                    {todosArray && todosArray.map((toDo) => {
                        const { category } = toDo;
                        if (handleValue === category)
                            return (
                                <Li key={toDo.id}>
                                    <TodoP>{toDo.text}</TodoP>
                                    <TodoRender {...toDo}></TodoRender>
                                </Li>);
                    })}
                </Ul>
            </MainContainer>
        </>
    );//handleChange={handleChange} 오류
}
export default CategoryAndList;
//이 제네릭은 prop을 입력하려고 할 때 유용합니다.formatGroupLabel
// <TodoRender></TodoRender>