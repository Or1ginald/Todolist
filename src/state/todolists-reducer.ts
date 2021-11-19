import {todolistAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {requestStatusType, setAppStatusAC, setErrorLogAC} from "../components/App/AppReducer";


/*-------------Types----------------*/
export type ToDoListsType = TodolistType & {
    filter: filterType
    entityStatus: requestStatusType
}

export type filterType = "All" | "Active" | "Completed";

type mainActionType =
    deleteToDoListACType
    | addToDoListACType
    | editToDoListTitleACType
    | changeToDoListFilterACType
    | setTodosACType
    | changeTodolistEntityStatusACType


export type deleteToDoListACType = ReturnType<typeof deleteToDoListAC>
export type addToDoListACType = ReturnType<typeof addToDoListAC>
type editToDoListTitleACType = ReturnType<typeof editToDoListTitleAC>
type changeToDoListFilterACType = ReturnType<typeof changeToDoListFilterAC>
export type setTodosACType = ReturnType<typeof setTodosAC>
export type changeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>
/*-------------Types----------------*/


const initialState: Array<ToDoListsType> = [];

export const todDoListsReducer = (state: Array<ToDoListsType> = initialState, action: mainActionType): Array<ToDoListsType> => {
    switch (action.type) {
        case "DELETE-TODOLIST": {
            return state.filter(el => el.id !== action.toDoListId)
        }
        case "ADD-TODOLIST": {
            return [{
                id: action.todolistID,
                title: action.title,
                filter: 'All',
                order: 0,
                addedDate: "",
                entityStatus: "idle"
            }, ...state]
        }
        case "EDIT-TODOLIST-TITLE": {
            return state.map(el => el.id === action.toDoListId ? {...el, title: action.title} : el)
        }
        case "CHANGE-FILTER": {
            return state.map(el => el.id === action.toDoListId ? {...el, filter: action.filter} : el)
        }
        case "SET_TODOS": {
            return action.todos.map(el => ({...el, filter: "All", entityStatus: "idle"}))
        }
        case "CHANGE_TODOLIST_ENTITY_STATUS": {
            return state.map(el => el.id === action.toDoListId ? {...el, entityStatus: action.entityStatus} : el)
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
export const changeTodolistEntityStatusAC = ( toDoListId: string,entityStatus: requestStatusType) => {
    return {
        type: "CHANGE_TODOLIST_ENTITY_STATUS",
        entityStatus,
        toDoListId
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
    dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
    dispatch(setAppStatusAC("loading"))
    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(deleteToDoListAC(todolistId))
            dispatch(changeTodolistEntityStatusAC(todolistId, "succeeded"))
            dispatch(setAppStatusAC("succeeded"))
        })
}
export const addToDoListTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addToDoListAC(title, res.data.data.item.id))
                dispatch(setAppStatusAC("succeeded"))
            }
            if (res.data.resultCode === 1) {
                dispatch(setErrorLogAC(res.data.messages[0]))
            }

            dispatch(setAppStatusAC("succeeded"))
        })
}
export const editToDoListTitleTC = (toDoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.updateTodolist(toDoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(editToDoListTitleAC(toDoListId, title))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                console.log("todolist editing error")
            }
        })
}
// export const deleteToDoListTC = (dispatch: Dispatch) => {}

/*-------------Thunk Creators----------------*/

