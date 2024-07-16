import { useEffect, useState } from "react";
import { TodoActionState } from "../constants";
import { FormInput, Todo } from "../react-app-env";
import { useAppDispatch, useAppSelector } from "./store";
import { addTodo, removeTodo, updateTodo } from "../redux-store/features/todo/todoSlice";
import { convertDateToInputString } from "../utils";
import { createToDoFeature, getToDoByIdFeature } from "../redux-store/features/todo/feature";

export const useTodoActionController = () => {
    const dispatch = useAppDispatch();


    const [selectedTodo, setSelectedTodo] = useState<Todo|null>(null);
    const [dateSelected, setDateSelected] = useState<string>(convertDateToInputString(new Date()));
    const [todoDateFilter, setTodoDateFilter] = useState(new Date());
    const [todoActionState, setTodoActionState] = useState<TodoActionState>(TodoActionState.DEFAULT);

    const openCreate = () => setTodoActionState(TodoActionState.ADD);
    const openView = async() => {
        // if(taskId){
        //     const todo = await dispatch(getToDoByIdFeature(taskId))
        //       setSelectedTodo(todo);
        //       console.log(selectedTodo, 'sel');
              
        // }
        setTodoActionState(TodoActionState.VIEW);
    }
    const clearSelectedTodo = () => setSelectedTodo(null);
    const resetTodoActionState = () => {
        setDateSelected(convertDateToInputString(new Date()));
        setTodoActionState(TodoActionState.DEFAULT);
        setSelectedTodo(null);
    }
    
    const onDateChange = (date: Date) => {
        setDateSelected(convertDateToInputString(date));
        setTodoDateFilter(date);
    }
    const onTodoDateFilterChange = setTodoDateFilter;

    const createTodo = async(data: FormInput) => {
        dispatch(addTodo(data));
       await dispatch(createToDoFeature(data))
    }

    const editTodo = (data: Todo) => {
        dispatch(updateTodo(data));
        
    }

    const goToEdit = () => {
        if (selectedTodo) {
            setTodoActionState(TodoActionState.EDIT);
        }
    }

    const handleDelete = () => {
        if (selectedTodo) {
            dispatch(removeTodo(selectedTodo));
        }
    }

    useEffect(() => {
        setSelectedTodo(null);
        setTodoActionState(TodoActionState.DEFAULT);
    }, [todoDateFilter]);

    return {selectedTodo, dateSelected, todoDateFilter, todoActionState, openCreate, onDateChange, resetTodoActionState, createTodo, onTodoDateFilterChange, openView, clearSelectedTodo, goToEdit, handleDelete, editTodo};
}

export type UseTodoActionController = ReturnType<typeof useTodoActionController>;