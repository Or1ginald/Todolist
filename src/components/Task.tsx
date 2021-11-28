import React, {ChangeEvent, useCallback} from 'react';
import {ChangeText} from "./ChangeText";
import {deleteTaskTC, updateTaskTC} from "../state/tasks-reducer";
import {useDispatch} from "react-redux";
import {TaskStatuses} from "../api/todolists-api";
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";


type TaskPropsType = {
    toDoListId: string
    id: string,
    status: TaskStatuses
    title: string
    // onChangeCallback: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    // debugger
    const {id, title, status} = props
    // console.log("one task render")

    const dispatch = useDispatch()

    const changeCheckBoxStatus = (event: ChangeEvent<HTMLInputElement>) => {
        const checked = event.currentTarget.checked;
        const model = checked ? {status: TaskStatuses.Completed} : {status: TaskStatuses.New}
        dispatch(updateTaskTC(props.toDoListId, props.id, model))
    }

    const editTaskTitle = useCallback((title: string) => {
        dispatch(updateTaskTC(props.toDoListId, props.id, {title}))
    }, [dispatch, props.toDoListId, props.id])

    const deleteTask = () => {
        dispatch(deleteTaskTC(props.toDoListId, props.id))
    }
    const label = { inputProps: { 'aria-label': 'Task Status' } };
    return (
        <li key={id}>
            <Checkbox
                {...label}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                checked={status === TaskStatuses.Completed}
                onChange={changeCheckBoxStatus}
            />
            <ChangeText title={title} callBack={editTaskTitle}/>
            <IconButton aria-label="delete" size="large" onClick={deleteTask}>
                <DeleteIcon />
            </IconButton>
        </li>
    );
});
