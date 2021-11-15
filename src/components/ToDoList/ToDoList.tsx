import React, {useCallback, useEffect} from "react";
import {InputPlusButton} from "../InputPlusButton/InputPlusButton";
import {ChangeText} from "../ChangeText";
import {addTaskTC, setTasksTC, taskType} from "../../state/tasks-reducer";
import {useDispatch} from "react-redux";
import {Task} from "../Task";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
// import {rootReducerType} from "../state/store";
import {
    changeToDoListFilterAC,
    deleteToDoListTC,
    editToDoListTitleTC,
    filterType
} from "../../state/todolists-reducer";
import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import {TaskStatuses} from "../../api/todolists-api";


type ToDoListPropsType = {
    toDoListId: string
    title: string
    tasks: taskType[]
    filter: filterType
}

export const ToDoList = React.memo((props: ToDoListPropsType) => {
    const dispatch = useDispatch()
    // const tasks = useSelector<rootReducerType, tasksType>(store => store.tasks)
    useEffect(() => {
        dispatch(setTasksTC(props.toDoListId))
    }, [dispatch, props.toDoListId])

    /*-------Functions--------*/

    const onFilterButtonClick = useCallback((filter: filterType) => {
        dispatch(changeToDoListFilterAC(props.toDoListId, filter))
    }, [dispatch, props.toDoListId])

    const onDeleteButtonClick = useCallback((toDoListId: string) => {
        dispatch(deleteToDoListTC(toDoListId))
    }, [dispatch])

    const handleAddTaskClick = useCallback((title: string) => {
        dispatch(addTaskTC(props.toDoListId, title))
    }, [dispatch, props.toDoListId])

    const editToDoListTitle = useCallback((title: string) => {
        dispatch(editToDoListTitleTC(props.toDoListId, title))
    }, [dispatch, props.toDoListId])

    let tasksList = props.tasks;
    if (props.filter === "Completed") {
        tasksList = props.tasks.filter(e => e.status === TaskStatuses.Completed)
    }
    if (props.filter === "Active") {
        tasksList = props.tasks.filter(e => e.status === TaskStatuses.New)
    }

    return <div>
        <h3>
            <ChangeText title={props.title} callBack={editToDoListTitle}/>
            <IconButton aria-label="delete" size="large" onClick={() => onDeleteButtonClick(props.toDoListId)}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <InputPlusButton addCallBack={handleAddTaskClick} label={"Add Task"}/>
        <ul>
            {tasksList.map(task => <Task id={task.id}
                                         status={task.status}
                                         title={task.title}
                                         key={task.id}
                                         toDoListId={props.toDoListId}/>)}
        </ul>
        <ButtonGroup color="primary" aria-label="medium secondary button group">
            <Button onClick={() => onFilterButtonClick("All")}>All</Button>
            <Button onClick={() => onFilterButtonClick("Active")}>Active</Button>
            <Button onClick={() => onFilterButtonClick("Completed")}>Completed</Button>
        </ButtonGroup>

    </div>
})