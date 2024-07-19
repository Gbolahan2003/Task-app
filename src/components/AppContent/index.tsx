import { useCallback, useEffect, useMemo, useState } from "react";
import "./styles.scss";
import DatePicker from "./DatePicker";
import { TaskFormMode, TodoActionState } from "../../constants";
import { UseTodoActionController } from "../../hooks/useTodoActionController";
import { logger } from "../../utils";
import TaskForm from "./TaskForm";
import AutoAnimateHeight from "../AutoAnimateHeight";
import HorizontalCalendar from "../HorizontalCalendar";
import TaskList from "./TaskList";
import ViewTask from "./ViewTask";
import { AddIcon } from "../../assets/svg";
import CustomButton from "../Button";
import Modal from "../Modal";
import { Todo } from "../../react-app-env";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { getToDosFeature } from "../../redux-store/features/todo/feature";

interface Props {
    todoController: UseTodoActionController;
}

export default function AppContent(props: Props) {
    useEffect(() => logger("Render AppContent"), []);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getToDosFeature());
    }, [dispatch]);

    const [showModal, setShowModal] = useState(false);

    const selectedTodo = useAppSelector(state => state.todos.todo);
    const windowSize = useWindowSize();

    const {
        todoDateFilter,
        todoActionState,
        dateSelected,
        onDateChange,
        resetTodoActionState,
        createTodo,
        onTodoDateFilterChange,
        clearSelectedTodo,
        openCreate,
        openView,
        goToEdit,
        handleDelete,
        handleChecked,
        editTodo,
    } = props.todoController;

    const closeModal = useCallback(() => {
        setShowModal(false);
        resetTodoActionState();
    }, [resetTodoActionState]);

    const openCreateModal = useCallback(() => {
        setShowModal(true);
        openCreate();
    }, [openCreate]);

    const openViewModal = useCallback((todo: Todo) => {
        if (windowSize.width <= 768) setShowModal(true);
        openView(todo);
    }, [windowSize.width, openView]);

    const todoActionComponent = useMemo(() => {
        switch (todoActionState) {
            case TodoActionState.DEFAULT:
                return <DatePicker value={new Date(dateSelected)} onChange={onDateChange} />;
            case TodoActionState.ADD:
                return (
                    <TaskForm
                        close={resetTodoActionState}
                        taskFormMode={TaskFormMode.ADD}
                        dateSelected={dateSelected}
                        createTodo={createTodo}
                    />
                );
            case TodoActionState.EDIT:
                return (
                    <TaskForm
                        close={resetTodoActionState}
                        taskFormMode={TaskFormMode.EDIT}
                        dateSelected={dateSelected}
                        editTodo={editTodo}
                        selectedTodo={selectedTodo}
                    />
                );
            case TodoActionState.VIEW:
                return selectedTodo && (
                    <ViewTask
                        todo={selectedTodo}
                        closeForm={() => {
                            resetTodoActionState();
                            clearSelectedTodo();
                        }}
                        goToEdit={goToEdit}
                        handleDelete={handleDelete}
                    />
                );
        }
    }, [
        todoActionState,
        dateSelected,
        onDateChange,
        resetTodoActionState,
        createTodo,
        selectedTodo,
        clearSelectedTodo,
        goToEdit,
        handleDelete,
        editTodo,
    ]);

    return (
        <>
            <Modal shouldShow={showModal} onRequestClose={closeModal}>
                {todoActionComponent}
            </Modal>

            <div className="app-content container d-flex flex-row py-4">
                <AutoAnimateHeight className="todo-content-container">
                    <HorizontalCalendar
                        dateSelected={dateSelected}
                        todoDateFilter={todoDateFilter}
                        onTodoDateFilterChange={onTodoDateFilterChange}
                    />

                    <TaskList
                        todoDateFilter={todoDateFilter}
                        selectTodo={openViewModal}
                        selectedTodo={selectedTodo}
                        handleChecked={handleChecked}
                    />

                    <div className="d-block d-md-none py-5 w-100">
                        <CustomButton
                            title="Create New Task"
                            leftIcon={<AddIcon />}
                            onClick={openCreateModal}
                            className="w-100"
                        />
                    </div>
                </AutoAnimateHeight>

                <AutoAnimateHeight className="todo-actions-container d-none d-md-block">
                    {todoActionComponent}
                </AutoAnimateHeight>
            </div>
        </>
    );
}
