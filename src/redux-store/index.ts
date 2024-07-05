import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import todoSlice from "./features/todoSlice";
import authSlice from "./features/auth";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['todos']
}

const combinedReducers = combineReducers({
    todos: todoSlice, 
    auth:authSlice
});

const persistedReducer = persistReducer(persistConfig, combinedReducers)

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export { store, persistor }