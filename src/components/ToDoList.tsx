import React, {useCallback} from "react";
import {taskType} from "../App";
import {InputPlusButton} from "./InputPlusButton";
import {ChangeText} from "./ChangeText";
import {addTaskAC} from "../state/tasks-reducer";
import {useDispatch} from "react-redux";
import {Task} from "./Task";
// import {rootReducerType} from "../state/store";
import {
    changeToDoListFilterAC,
    deleteToDoListAC,
    deleteToDoListTC,
    editToDoListTitleAC,
    editToDoListTitleTC,
    filterType
} from "../state/todolists-reducer";

type ToDoListPropsType = {
    toDoListId: string
    title: string
    tasks: taskType[]
    filter: filterType
}

export const ToDoList = React.memo((props: ToDoListPropsType) => {

    // const tasks = useSelector<rootReducerType, tasksType>(store => store.tasks)

    /*-------Functions--------*/
    const dispatch = useDispatch()
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
        dispatch(addTaskAC(props.toDoListId, title))
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
        tasksList = props.tasks.filter(e => e.isDone)
    }
    if (props.filter === "Active") {
        tasksList = props.tasks.filter(e => !e.isDone)
    }
    return <div>
        <h3>
            <ChangeText title={props.title} callBack={editToDoListTitle}/>
            <button onClick={() => deleteToDoList(props.toDoListId)}>x</button>
        </h3>
        <InputPlusButton addCallBack={addTask}/>
        <ul>
            {tasksList.map(e => <Task id={e.id} isDone={e.isDone} title={e.title} key={e.id}
                                      toDoListId={props.toDoListId}/>)}
        </ul>
        <div>
            <button onClick={() => changeFilterHandler("All")}>All</button>
            <button onClick={() => changeFilterHandler("Active")}>Active</button>
            <button onClick={() => changeFilterHandler("Completed")}>Completed</button>
        </div>
    </div>
})