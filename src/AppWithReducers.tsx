import React, {useCallback, useEffect} from 'react';

import './App.css';
import {ToDoList} from "./components/ToDoList";
import {InputPlusButton} from "./components/InputPlusButton";
import {
    addToDoListAC, addToDoListTC, setTodosAC, setTodosTC, ToDoListsType,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./state/store";
import {todolistAPI} from "./api/todolists-api";

export type taskType = { id: string, title: string, isDone: boolean }

export type tasksType = {
    [key: string]: taskType[]
}

const AppWithReducers = React.memo(() => {
    const dispatch = useDispatch()
    const toDoLists = useSelector<rootReducerType, Array<ToDoListsType>>(store => store.toDoLists)
    const tasks = useSelector<rootReducerType, tasksType>(store => store.tasks)


    /*-------Functions--------*/
    const addToDoList = (title: string) => {
        debugger
        dispatch(addToDoListTC(title))
    }
    // const deleteToDoList = useCallback((toDoListId: string) => {
    //     dispatch(deleteToDoListAC(toDoListId))
    //
    // }, [dispatch])
    // const addTask = useCallback((toDoListId: string, title: string) => {
    //     dispatch(addTaskAC(toDoListId, title))
    // }, [dispatch])
    // const changeCheckBoxStatus = useCallback((toDoListId: string, id: string, checked: boolean) => {
    //     dispatch(changeTaskStatusAC(toDoListId, id, checked))
    // }, [dispatch])
    // const changeFilter = useCallback((toDoListId: string, newFilter: filterType) => {
    //     dispatch(changeToDoListFilterAC(toDoListId, newFilter))
    // }, [dispatch])
    //
    // const editToDoListTitle = useCallback((toDoListId: string, title: string) => {
    //     dispatch(editToDoListTitleAC(toDoListId, title))
    // }, [dispatch])
    // const editTaskTitle = useCallback((toDoListId: string, id: string, title: string) => {
    //     dispatch(changeTaskTitleAC(toDoListId, id, title))
    // }, [dispatch])


    useEffect(() => {
        dispatch(setTodosTC)
    }, [dispatch])

    /*-------Component--------*/
    return (
        <div className="App">
            <InputPlusButton addCallBack={addToDoList}/>
            {toDoLists.map(e => {
                // let tasksList = tasks[e.id];
                // if (e.filter === "Completed") {
                //     tasksList = tasks[e.id].filter(e => e.isDone)
                // }
                // if (e.filter === "Active") {
                //     tasksList = tasks[e.id].filter(e => !e.isDone)
                // }
                return (<ToDoList
                    key={e.id}
                    toDoListId={e.id}
                    title={e.title}
                    filter={e.filter}
                    tasks={tasks[e.id]}

                />)
            })}
        </div>
    );
})

export default AppWithReducers;
