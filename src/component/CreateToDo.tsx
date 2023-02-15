import { Todos } from '../Atoms';
import {
    useSetRecoilState,
} from "recoil";
import { useForm } from "react-hook-form";
import styled from 'styled-components';

export interface formDate {
    Todos: string;
}
const Container = styled.div`
    width: 50%;
    height: 10%;
    background-color: #6A679E;
    border-radius: 0.4rem;
    box-shadow: 5px 5px 5px rgb(0 0 0 / 40%);
    margin: 2rem;
    padding: 1rem;
`

const CreateToForm = styled.form`
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    height: 50%;
`
const TodoInput = styled.input`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border: 3px solid #ced6e0;
    outline: none;
    &:hover,&:focus {
      border-color: #3d9cff;
      box-shadow: 0px 10px 20px -13px rgba(32, 56, 117, 0.35);
    }
`
export const SubmitInput = styled.input`
    background-color: white;
    color: #503F47;
    border-radius: 0.3rem;
    font-weight: 900;
    text-align: center;
    cursor: pointer;
    padding: 0 1.5rem;
    border: 1px solid white;
    margin: 5px;
    height: 100%;
    &:hover{
        background-color: #503F47;
        color:  #E7F4FC;
    }
`
const ErrorM = styled.div`
    margin-top:10px;
    color: white;
`

const CreateToDo = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<formDate>();
    const setTodosArray = useSetRecoilState(Todos);
    const onSubmitTodos = ({ Todos }: any) => {
        setTodosArray((oldTodos) => (
            [{ text: Todos, id: Date.now(), category: "Todo" }, ...oldTodos]
        ));
        setValue("Todos", "");
    };
    return (
        <Container>
            <CreateToForm onSubmit={handleSubmit(onSubmitTodos)}>
                <TodoInput placeholder=
                    "할일을 입력하세요" {...register("Todos", {
                        required: {
                            value: true,
                            message: "필수로 입력해야 하는 값입니다",
                        },
                    }
                    )}></TodoInput>
                <SubmitInput type="submit" />
            </CreateToForm>
            <ErrorM>{errors.Todos?.message}</ErrorM>
        </Container>
    );
}
export default CreateToDo;