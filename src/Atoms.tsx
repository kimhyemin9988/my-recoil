import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
    key: "first",
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

export interface IuserData {
    name: string;
    email: string;
    displayName: string;
    phoneNumber: string;
    photoURL: string;
}

export const UserData = atom<IuserData[]>({
    key: "UserData",
    default: [],
    effects_UNSTABLE: [persistAtom],
})