import React, { useState, useEffect } from 'react';
import './styles.scss';

import { Todo } from '../../react-app-env';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { getToDosFeature } from '../../redux-store/features/todo/feature';
import { CalendarIcon, ClockIcon, CloseIcon } from '../../assets/svg';
import { getDateString } from '../../utils';
import CustomIconButton from '../IconButton';
import CustomButton from '../Button';

interface Props {
    // isLoading: boolean;
    todo: Todo;
    closeForm: VoidFunction;
    handleDelete: VoidFunction;
    goToEdit: VoidFunction;
    
}

const ViewTask: React.FC<Props> = ({ todo, closeForm, handleDelete, goToEdit }) => {
    const isLoading = useAppSelector(state=>state.todos.isLoading)
    
    return (
        <div className="view-task">
            <div className="view-task_header d-flex flex-row justify-content-end align-items-center mb-2">
                <CustomIconButton onClick={closeForm}>
                    <CloseIcon />
                </CustomIconButton>
            </div>

            {isLoading ? (
                         <div className="pulsating-loader">
                        
                         <div className="loader-block loading-title"></div>
                         <div className="loader-block loading-description"></div>
                         <div className="view-task__details ">
                             <div className="loader-block loading-details"></div>
                             <div className="loader-block loading-details"></div>
                         </div>
                         <div className="view-task__actions d-flex flex-col">
                             <div className="loader-block loading-button"></div>
                             <div className="loader-block loading-button"></div>
                         </div>
                     </div>
     
            ) : (
                <>
                    <h3>{todo.title}</h3>
                    <h4>{todo.description}</h4>
                    <div className="view-task__details my-5">
                        <div>
                            <span>
                                <CalendarIcon />
                            </span>
                            <span>{getDateString(todo.createdAt)}</span>
                        </div>
                        <div>
                            <span>
                                <ClockIcon />
                            </span>
                            <span className="time-range">
                                {todo.start} - {todo.end}
                            </span>
                        </div>
                    </div>
                    <div className="view-task__actions d-flex flex-row">
                        <CustomButton title="Delete" variant="secondary" onClick={handleDelete} />
                      <CustomButton title="Edit" disabled={todo.status==='Completed'} onClick={goToEdit} />
                    </div>
                </>
            )}
        </div>
    );
};

export default ViewTask;
