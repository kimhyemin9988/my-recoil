import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
    key:"first",
    storage: localStorage,
});

export interface IToDo {
    text: any;
    id: number;
    category: string;
}
export const Todos = atom<IToDo[]>({
    key: "Todos",
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export interface ICategory {
    value: string;
    label: string;
}
export const Category = atom<ICategory[]>({
    key: "Category",
    default: [{ value: "Todo", label: "Todo" }, { value: "Done", label: "Done" }, { value: "Doing", label: "Doing" }],
    effects_UNSTABLE: [persistAtom],
})
    //선택지 제한 "To_Do" | "Doing" | "Done" // 사용자가 옵션 추가 가능