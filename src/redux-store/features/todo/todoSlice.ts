import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormInput, Todo } from "../../../react-app-env";

import type { RootState } from "../..";


interface TodoSliceState {
    todos: Todo[];
    todo:Todo|null,
    id:string|null,
    updateId:string|null
    isLoading:boolean
}

const initialState: TodoSliceState = {
    todos: [],
    todo:null,
    id:null,
    updateId:null,
    isLoading:false
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            state.todos = action.payload;
        },
        setTodo:(state, action:PayloadAction<Todo|null>)=>{
            state.todo = action.payload
        },
        addTodo: (state, action: PayloadAction<FormInput>) => {
            state.todos = [{ id: state.todos.length + 1, ...action.payload, complete: false}, ...state.todos];
        },
        removeTodo: (state, action: PayloadAction<Todo>) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
        },
        updateTodo: (state, action: PayloadAction<Todo>) => {
            state.todos = state.todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, ...action.payload };
                }

                return todo;
            })
        },
        setTaskID:(state, action:PayloadAction<string|null>)=>{
            state.id= action.payload
        },
        setUpdateID:(state, action:PayloadAction<string|null>)=>{
            state.updateId = action.payload
        },
        setIsLoading:(state, action:PayloadAction<boolean>)=>{
            state.isLoading = action.payload
        }
        
    }
});

export const { setTodos,setTodo, setIsLoading, addTodo,setUpdateID, removeTodo, updateTodo, setTaskID } = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;

export default todoSlice.reducer;