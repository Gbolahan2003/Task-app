import { useState } from "react";
import { TodoActionState } from "../constants";
import { FormInput, Todo } from "../react-app-env";
import { useAppDispatch } from "./store";
import { addTodo } from "../redux-store/features/todoSlice";
import { convertDateToInputString } from "../utils";

export const useTodoActionController = () => {
    const dispatch = useAppDispatch();

    const [dateSelected, setDateSelected] = useState<string>(convertDateToInputString(new Date()));
    const [todoActionState, setTodoActionState] = useState<TodoActionState>(TodoActionState.DEFAULT);

    const openCreate = () => setTodoActionState(TodoActionState.ADD);
    const resetTodoActionState = () => setTodoActionState(TodoActionState.DEFAULT);
    const onDateChange = (date: Date) => setDateSelected(convertDateToInputString(date));

    const createTodo = (data: FormInput) => {
        dispatch(addTodo(data));
        setDateSelected(convertDateToInputString(new Date()));
        setTodoActionState(TodoActionState.DEFAULT);
    }

    return {dateSelected, todoActionState, openCreate, onDateChange, resetTodoActionState, createTodo};
}

export type UseTodoActionController = ReturnType<typeof useTodoActionController>;