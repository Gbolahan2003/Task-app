import { useEffect, useState, useCallback } from "react";
import { TodoActionState } from "../constants";
import { FormInput, Todo } from "../react-app-env";
import { useAppDispatch, useAppSelector } from "./store";
import { setIsLoading, setTodo } from "../redux-store/features/todo/todoSlice";
import { convertDateToInputString } from "../utils";
import { createToDoFeature, deleteTodoFeature, getToDoByIdFeature, getToDosFeature, updateTodoStatus, updtateToDoFeature } from "../redux-store/features/todo/feature";
import { batch } from "react-redux";

export const useTodoActionController = () => {
    const dispatch = useAppDispatch();

    const [dateSelected, setDateSelected] = useState<string>(convertDateToInputString(new Date()));
    const [todoDateFilter, setTodoDateFilter] = useState(new Date());
    const [todoActionState, setTodoActionState] = useState<TodoActionState>(TodoActionState.DEFAULT);

    const selectedTodo = useAppSelector(state => state.todos.todo);
    const openCreate = useCallback(() => setTodoActionState(TodoActionState.ADD), []);
    
    const openView = useCallback(async (todo: Todo) => {
      await  dispatch(setIsLoading(true))
        setTodoActionState(TodoActionState.VIEW);
        await dispatch(getToDoByIdFeature(todo._id));
        dispatch(setIsLoading(false))
    }, [dispatch]);
    
    const clearSelectedTodo = useCallback(() => dispatch(setTodo(null)), [dispatch]);

    const resetTodoActionState = useCallback(() => {
        setDateSelected(convertDateToInputString(new Date()));
        setTodoActionState(TodoActionState.DEFAULT);
        clearSelectedTodo();
    }, [clearSelectedTodo]);

    const onDateChange = useCallback((date: Date) => {
        setDateSelected(convertDateToInputString(date));
        setTodoDateFilter(date);
    }, []);

    const onTodoDateFilterChange = setTodoDateFilter;

    const createTodo = useCallback(async (data: FormInput) => {
        await dispatch(createToDoFeature(data));
        batch(async()=>{
            await dispatch(getToDosFeature())
        })
        // dispatch(addTodo(data));
        resetTodoActionState();
    }, [dispatch, resetTodoActionState]);

    const editTodo = useCallback(async(id:string, data:Todo) => {
        // dispatch(updateTodo(data));
     await dispatch(updtateToDoFeature(id, data))
     batch(async()=>{
        await dispatch(getToDosFeature())
    })
        resetTodoActionState();
    }, [dispatch, resetTodoActionState]);

    const goToEdit = useCallback(() => {
        if (selectedTodo) {
            setTodoActionState(TodoActionState.EDIT);
        }
    }, [selectedTodo]);

    const handleDelete = useCallback(async () => {
        if (selectedTodo) {
            await dispatch(deleteTodoFeature(selectedTodo._id));
            batch(() => {
                dispatch(getToDosFeature());
            });
            setTodoActionState(TodoActionState.DEFAULT)
        }

    }, [dispatch, selectedTodo]);

   

    useEffect(() => {
        clearSelectedTodo();
        setTodoActionState(TodoActionState.DEFAULT);
    }, [todoDateFilter, clearSelectedTodo]);

    return {
        selectedTodo,
        dateSelected,
        todoDateFilter,
        todoActionState,
        openCreate,
    
        onDateChange,
        resetTodoActionState,
        createTodo,
        onTodoDateFilterChange,
        openView,
        clearSelectedTodo,
        goToEdit,
        handleDelete,
        editTodo
    };
};

export type UseTodoActionController = ReturnType<typeof useTodoActionController>;
