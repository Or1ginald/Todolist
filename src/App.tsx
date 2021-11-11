import React, {useCallback, useEffect} from 'react';

import './App.css';
import {ToDoList} from "./components/ToDoList/ToDoList";
import {InputPlusButton} from "./components/InputPlusButton/InputPlusButton";
import {addToDoListTC, setTodosTC, ToDoListsType,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./state/store";
import {tasksType} from "./state/tasks-reducer";

export const App = React.memo(() => {
    const dispatch = useDispatch()
    const toDoLists = useSelector<rootReducerType, Array<ToDoListsType>>(store => store.toDoLists)
    const tasks = useSelector<rootReducerType, tasksType>(store => store.tasks)


    /*-------Functions--------*/
    const addToDoList = useCallback((title: string) => {
        dispatch(addToDoListTC(title))
    },[dispatch])
    useEffect(() => {
        dispatch(setTodosTC)
    }, [dispatch])



    /*-------Component--------*/
    return (
        <div className="App">
            <InputPlusButton addCallBack={addToDoList} label={"Add Todolist"}/>
            {toDoLists.map(e => {
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

