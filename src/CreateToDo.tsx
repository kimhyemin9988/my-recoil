import { Todos } from './Atoms';
import {
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
} from "recoil";
import { useForm } from "react-hook-form";

export interface formDate {
    Todos: string;
}
const CreateToDo = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<formDate>();
    const setTodosArray = useSetRecoilState(Todos);
    const onSubmitTodos = ({ Todos }: any) => {
        //새로운 입력값 newTodo는 text
        setTodosArray((oldTodos) => (
            //이전에 저장된 값 value
            [{ text: Todos, id: Date.now(), category: "Todo"}, ...oldTodos]
        ));
        setValue("Todos", "");
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmitTodos)}>
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
    );
}
export default CreateToDo;