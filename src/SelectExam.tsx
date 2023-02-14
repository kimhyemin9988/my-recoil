import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import Select, { SingleValue } from 'react-select';
import { Category, Todos } from './Atoms';
import EditingCate from './EditingCate';

const SelectExam = () => {
    const [oldCategory, setoldCategory] = useRecoilState(Category);
    // set value for default selection
    // handle onChange event of the dropdown and get value
    // React-select get value on change
    const handleChange = (e: any) => {
        const {value} = e; // value ==  "Todo" 
    }

    return (
        <>
            <Select options={oldCategory}
                onChange={handleChange} // 선택한 obj return
            />
            <EditingCate></EditingCate>
        </>
    );
}
export default SelectExam;
//이 제네릭은 prop을 입력하려고 할 때 유용합니다.formatGroupLabel