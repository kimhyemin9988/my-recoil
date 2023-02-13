import { atom } from "recoil";

export interface IToDo {
    text:any;
    id:number;
    categoriesOption:string;//선택지 제한 "To_Do" | "Doing" | "Done" // 사용자가 옵션 추가 가능
}
export const Todos = atom<IToDo[]>({
    key:"Todos",
    default:[],
})