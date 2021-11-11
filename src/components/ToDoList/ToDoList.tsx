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

    const changeFilterHandler = (filter: filterType) => {
        changeFilter(props.toDoListId, filter)
    }
    // const addTaskHandler = useCallback((inputVal: string) => {
    //     addTask(props.toDoListId, inputVal)
    // },[props.toDoListId])
    const deleteToDoList = useCallback((toDoListId: string) => {
        dispatch(deleteToDoListTC(toDoListId))
    }, [dispatch])
    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(props.toDoListId, title))
    }, [dispatch, props.toDoListId])
    const changeFilter = useCallback((toDoListId: string, newFilter: filterType) => {
        dispatch(changeToDoListFilterAC(toDoListId, newFilter))
    }, [dispatch])

    const editToDoListTitle = useCallback((title: string) => {
        dispatch(editToDoListTitleTC(props.toDoListId, title))
    }, [dispatch, props.toDoListId])
    /*-------Functions--------*/
    let tasksList = props.tasks;
    if (props.filter === "Completed") {
        tasksList = props.tasks.filter(e => e.status===2)
    }
    if (props.filter === "Active") {
        tasksList = props.tasks.filter(e => e.status===0)
    }
    return <div>
        <h3>
            <ChangeText title={props.title} callBack={editToDoListTitle}/>
            {/*<button onClick={() => deleteToDoList(props.toDoListId)}>x</button>*/}
            <IconButton aria-label="delete" size="large" onClick={() => deleteToDoList(props.toDoListId)}>
                <DeleteIcon />
            </IconButton>
        </h3>
        <InputPlusButton addCallBack={addTask} label={"Add Task"}/>
        <ul>
            {tasksList.map(e => <Task id={e.id} status={e.status} title={e.title} key={e.id}
                                      toDoListId={props.toDoListId}/>)}
        </ul>

        <ButtonGroup color="primary" aria-label="medium secondary button group">
            <Button onClick={() => changeFilterHandler("All")}>All</Button>
            <Button onClick={() => changeFilterHandler("Active")}>Active</Button>
            <Button onClick={() => changeFilterHandler("Completed")}>Completed</Button>
            {/*<button onClick={() => changeFilterHandler("All")}>All</button>*/}
            {/*<button onClick={() => changeFilterHandler("Active")}>Active</button>*/}
            {/*<button onClick={() => changeFilterHandler("Completed")}>Completed</button>*/}
        </ButtonGroup>

    </div>
})