import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";


/*-------------Types----------------*/
export type ToDoListsType = TodolistType & { filter: filterType }

export type filterType = "All" | "Active" | "Completed";

type mainActionType =
    deleteToDoListACType
    | addToDoListACType
    | editToDoListTitleACType
    | changeToDoListFilterACType
    | setTodosACType
export type deleteToDoListACType = ReturnType<typeof deleteToDoListAC>
export type addToDoListACType = ReturnType<typeof addToDoListAC>
type editToDoListTitleACType = ReturnType<typeof editToDoListTitleAC>
type changeToDoListFilterACType = ReturnType<typeof changeToDoListFilterAC>
export type setTodosACType = ReturnType<typeof setTodosAC>
/*-------------Types----------------*/

export let ToDoListId1 = v1();
export let ToDoListId2 = v1();

const initialState: Array<ToDoListsType> = [];

export const todDoListsReducer = (state: Array<ToDoListsType> = initialState, action: mainActionType): Array<ToDoListsType> => {
    switch (action.type) {
        case "DELETE-TODOLIST": {
            return state.filter(el => el.id !== action.toDoListId)
        }
        case "ADD-TODOLIST": {
            return [...state, {id: action.todolistID, title: action.title, filter: 'All', order: 0, addedDate: ""}]
        }
        case "EDIT-TODOLIST-TITLE": {
            return state.map(e => e.id === action.toDoListId ? {...e, title: action.title} : e)
        }
        case "CHANGE-FILTER": {
            return state.map(e => e.id === action.toDoListId ? {...e, filter: action.filter} : e)
        }
        case "SET_TODOS": {
            return action.todos.map(el => ({...el, filter: "All"}))
        }
        default: {
            return state
        }
    }
}

/*-------------Action Creators----------------*/
export const deleteToDoListAC = (toDoListId: string) => {
    return {
        type: "DELETE-TODOLIST",
        toDoListId,
    } as const
}
export const addToDoListAC = (title: string) => {
    debugger
    return {
        type: "ADD-TODOLIST",
        title,
        todolistID: v1()
    } as const
}
export const editToDoListTitleAC = (toDoListId: string, title: string) => {
    return {
        type: "EDIT-TODOLIST-TITLE",
        title,
        toDoListId
    } as const
}
export const changeToDoListFilterAC = (toDoListId: string, filter: filterType) => {
    return {
        type: "CHANGE-FILTER",
        toDoListId,
        filter,
    } as const
}

export const setTodosAC = (todos: Array<TodolistType>) => {
    return {
        type: "SET_TODOS",
        todos
    } as const
}
/*-------------Action Creators----------------*/
/*-------------Thunk Creators----------------*/


export const setTodosTC = (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then(res => dispatch(setTodosAC(res.data)))
}
export const deleteToDoListTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistId)
        .then(res => dispatch(deleteToDoListAC(todolistId)))
}
export const addToDoListTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
        .then(res => dispatch(addToDoListAC(title)))
}
export const editToDoListTitleTC = (toDoListId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(toDoListId, title)
        .then(res=>{
            if(res.data.resultCode===0){
                dispatch(editToDoListTitleAC(toDoListId, title))
            } else {
                console.log("todolist editing error")
            }
        })
}
// export const deleteToDoListTC = (dispatch: Dispatch) => {}

/*-------------Thunk Creators----------------*/

