
import {todolistAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../components/App/AppReducer";


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
export const addToDoListAC = (title: string, todolistID: string) => {
    return {
        type: "ADD-TODOLIST",
        title,
        todolistID
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
    dispatch(setAppStatusAC("loading"))
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setTodosAC(res.data))
            dispatch(setAppStatusAC("succeeded"))
        })
}
export const deleteToDoListTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(deleteToDoListAC(todolistId))
            dispatch(setAppStatusAC("succeeded"))
        })
}
export const addToDoListTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.createTodolist(title)
        .then(res => {
            dispatch(addToDoListAC(title, res.data.data.item.id))
            dispatch(setAppStatusAC("succeeded"))
        })
}
export const editToDoListTitleTC = (toDoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.updateTodolist(toDoListId, title)
        .then(res=>{
            if(res.data.resultCode===0){
                dispatch(editToDoListTitleAC(toDoListId, title))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                console.log("todolist editing error")
            }
        })
}
// export const deleteToDoListTC = (dispatch: Dispatch) => {}

/*-------------Thunk Creators----------------*/

