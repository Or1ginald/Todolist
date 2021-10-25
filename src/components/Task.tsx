import React, {ChangeEvent, useCallback} from 'react';
import {ChangeText} from "./ChangeText";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "../state/tasks-reducer";
import {useDispatch} from "react-redux";


type TaskPropsType = {
    toDoListId: string
    id: string,
    isDone: boolean
    title: string
    // onChangeCallback: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    console.log("one task render")
    const changeCheckBoxStatus = (event: ChangeEvent<HTMLInputElement>) => {
        // changeCheckBoxStatus(toDoListId, e.id, event.currentTarget.checked)
        dispatch(changeTaskStatusAC(props.toDoListId, props.id, event.currentTarget.checked))
    }
    const dispatch = useDispatch()
    const {id, title, isDone} = props
    const editTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(props.toDoListId, props.id, title))
    }, [dispatch, props.toDoListId, props.id])
    const deleteTask = () => {
        dispatch(deleteTaskAC(props.toDoListId, props.id))
    }
    return (
        <li key={id}>
            <input type="checkbox" checked={isDone} onChange={changeCheckBoxStatus}/>
            <ChangeText title={title} callBack={editTaskTitle}/>
            <button onClick={deleteTask}>x</button>
        </li>
    );
});
