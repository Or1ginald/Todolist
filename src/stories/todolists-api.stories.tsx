import React, {useEffect} from "react";
import {useState} from "react";
import {todolistAPI} from "../api/todolists-api";

export default {
    title: "API"
}

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "83d8ce59-1071-4004-a943-7e866657a87e",
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists().then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist("ВжухВжух").then(res => setState(res.data))
    }, [])
    return <div>{"Все охуенно"}</div>
}
export const DeleteTodolists = () => {
    const [state, setState] = useState<any>({})
    useEffect(() => {
        const todolistId = "73e1da69-f4c3-449b-bc9c-711a401d97b3"
        todolistAPI.deleteTodolist(todolistId).then((res) => setState(res.data))
    }, [])

    const requestResult = state.resultCode === 0 ? "Запрос выполнен" : "Что-то пошло не так"
    return (
        <div>
            <div> {requestResult}</div>
            {/*<div>{JSON.stringify(state)}</div>*/}
        </div>)
}
export const UpdateTodolists = () => {
    const newName = "OOOO"
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "73e1da69-f4c3-449b-bc9c-711a401d97b3"
        todolistAPI.updateTodolist(todolistId, newName).then(res => setState(res.data))
    }, [])
    return <div>{`Имя тудулиста поменяно на ${newName}`}</div>
}

export const GetTasks = () => {
    // const [tasksInput, setTasksInput] = useState<string>("")
    const [todolistInput, setTodolistInput] = useState<string>("")
    const [state, setState] = useState<any>({})
    const onClickHandler = () => {
        return todolistAPI.getTasks(todolistInput).then(res => setState(res.data))
    }
    return (
        <div>
            <input type="text" placeholder={"Todolist ID"} value={todolistInput}
                   onChange={event => setTodolistInput(event.currentTarget.value)}/>
            {/*<input type="text" placeholder={"tasksInput"} onChange={event => setTasksInput(event.currentTarget.value)}/>*/}
            <button onClick={onClickHandler}>Search</button>
            <div>{JSON.stringify(state)}</div>
        </div>
    )
}

export const CreateTask = () => {
    const [title, setTitle] = useState<any>("")
    const [todolistID, setTodolistID] = useState<string>("")
    const onClickHandler = () => {
        return todolistAPI.createTask(todolistID, title)
    }

    return (
        <React.Fragment>
            <input type="text" placeholder={"Name your task"} value={title}
                   onChange={event => setTitle(event.currentTarget.value)}/>
            <input type="text" placeholder={"Todolist ID"} value={todolistID}
                   onChange={event => setTodolistID(event.currentTarget.value)}/>
            <button onClick={onClickHandler}>Create</button>
        </React.Fragment>
    )
}
export const DeleteTask = () => {
    const [taskID, setTaskID] = useState<any>("")
    const [todolistID, setTodolistID] = useState<string>("")
    const [responceStaus, setResponceStatus] = useState<any>({})
    const onClickHandler = () => {
        return todolistAPI.deleteTask(todolistID, taskID).then(res => setResponceStatus(res.data))
    }
    const requestResult = responceStaus.resultCode === 0 ? "Запрос выполнен" : "Что-то пошло не так"
    return (
        <React.Fragment>
            <input type="text" placeholder={"TaskID"} value={taskID}
                   onChange={event => setTaskID(event.currentTarget.value)}/>
            <input type="text" placeholder={"Todolist ID"} value={todolistID}
                   onChange={event => setTodolistID(event.currentTarget.value)}/>
            <button onClick={onClickHandler}>Delete</button>
            <div>{requestResult}</div>
        </React.Fragment>
    )
}
