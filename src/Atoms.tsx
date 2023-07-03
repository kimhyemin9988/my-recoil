import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

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
});

export interface ICategory {
  value: string;
  label: string;
}

export const Category = atom<ICategory[] | undefined>({
  key: "Category",
  default: undefined,
});  
