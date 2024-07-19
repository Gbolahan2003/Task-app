import React, { useCallback, useRef } from "react";
import { Todo } from "../../../react-app-env";
import { isDateSame } from "../../../utils";
import { Checkbox } from "../../CustomInputs";
import { useAppDispatch } from "../../../hooks/store";
import { setTaskID, setUpdateID } from "../../../redux-store/features/todo/todoSlice";
import { RIPPLE_DELAY } from "../../../constants";
import classNames from "classnames";
import './styles.scss'
import { getToDosFeature, updateTodoStatus } from "../../../redux-store/features/todo/feature";
import { batch } from "react-redux";

interface Props {
    todo: Todo;
    selectTodo: (todo: Todo) => void;
    selected?: boolean;

}

export default function TaskTile({ todo, selectTodo, selected = false }: Props) {
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLDivElement | null>(null);

    const getDisplayDate = useCallback(() => {
        if (isDateSame(new Date(), new Date(todo.date))) {
            return "Today";
        }
        return todo.date;
    }, [todo.date]);

    const onChecked = async () => {
        if (todo && todo.status !== 'Completed') {
            await dispatch(updateTodoStatus(todo._id, 'Completed'));
            batch(() => {
                dispatch(getToDosFeature());
            });
        
        }
    };

    const showRipple = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        ref.current?.appendChild(ripple);

        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
        }

        setTimeout(() => {
            ripple.remove();
            selectTodo(todo);
        }, RIPPLE_DELAY);
    };

    const handleClick: React.MouseEventHandler<HTMLElement> = (e) => {
        showRipple(e);
        dispatch(setTaskID(todo._id));
    };

    return (
        <div
            ref={ref}
            className={classNames("task-tile position-relative d-flex flex-row align-items-center justify-content-between", {
                'complete': todo.status === 'Completed',
                'selected': selected,
            })}
            onClick={handleClick}
        >
            <div className="left d-flex flex-row align-items-center">
                <Checkbox
                    disabled={todo.status === 'Completed'}
                    isChecked={todo.status === 'Completed'}
                    onChecked={onChecked}
                />
       <div className="">
       <span className="title ">{todo.title}</span>
                <span className="time-range">{todo.start} - {todo.end}</span>

       </div>
            </div>

            <div className="right">{getDisplayDate()}</div>
        </div>
    );
}
