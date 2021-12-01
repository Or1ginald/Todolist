import {
    addToDoListACType,
    deleteToDoListACType,
    setTodosACType,
} from "./todolistsReducer";
import {Dispatch} from "redux";
import {todolistAPI, updateTaskRequestModel} from "../../api/todolists-api";
import {rootReducerType} from "../store";
import {setAppStatusAC} from "./appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


/*------------Types---------------*/
type mainActionType =
    deleteTaskACType
    | updateTaskACType
    | changeTaskStatusACType
    | addTaskACType
    | addToDoListACType
    | deleteToDoListACType
    | setTodosACType
    | setTasksACType

type deleteTaskACType = ReturnType<typeof deleteTaskAC>
type updateTaskACType = ReturnType<typeof updateTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type setTasksACType = ReturnType<typeof setTasksAC>

/*------------Types---------------*/

export type tasksType = {
    [key: string]: taskType[]
}

export type taskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string | null
}

type updateTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string | null
    deadline?: string | null
}

const initialState: tasksType = {
    // [ToDoListId1]: [
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ],
    // [ToDoListId2]: [
    //     {id: v1(), title: "HTML&CSS2", isDone: true},
    //     {id: v1(), title: "JS2", isDone: true},
    //     {id: v1(), title: "ReactJS2", isDone: false},
    //     {id: v1(), title: "Rest API2", isDone: false},
    //     {id: v1(), title: "GraphQL2", isDone: false},
    // ]
}

export const tasksReducer = (state: tasksType = initialState, action: mainActionType): tasksType => {
    switch (action.type) {
        case "SET_TODOS": {
            // action.todos.forEach(el=>{
            //     return {...store, [el.id]: []}
            // })
            let copyState = {...state}
            action.todos.forEach(el => {
                copyState[el.id] = []
            })
            return copyState
        }
        case "DELETE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(e => e.id !== action.taskId)}
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(e => e.id === action.taskId ?
                    {...e, ...action.task} : e)
            }
        }
        case "SET_TASKS": {
            return {...state, [action.todolistId]: action.tasks}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(e => e.id === action.taskId ? {
                    ...e,
                    isDone: action.isDone
                } : e)
            }
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.todolistId]: [action.task, ...state[action.todolistId]]
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolistID]: []}
        }
        case "DELETE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.toDoListId]
            return copyState
        }

        default: {
            return state
        }
    }
}

/*------------Action Creators---------------*/
export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "DELETE-TASK",
        todolistId,
        taskId,
    } as const
}
export const updateTaskAC = (todolistId: string, taskId: string, task: updateTaskModelType) => {
    return {
        type: "CHANGE-TASK-TITLE",
        todolistId,
        taskId,
        task,
    } as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS",
        todolistId,
        taskId,
        isDone,
    } as const
}
export const addTaskAC = (todolistId: string, task: taskType) => {
    return {
        type: "ADD-TASK",
        todolistId,
        task,
    } as const
}
export const setTasksAC = (tasks: Array<taskType>, todolistId: string) => {
    return {
        type: "SET_TASKS",
        tasks,
        todolistId
    } as const
}
/*------------Action Creators---------------*/
//thunks
export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.getTasks(todolistId)
        .then(res => {
        dispatch(setTasksAC(res.data.items, todolistId))
        dispatch(setAppStatusAC("succeeded"))
    });
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTaskAC(todolistId, taskId))
                dispatch(setAppStatusAC("succeeded"))
            }
            if (res.data.resultCode === 1) {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode===0) {
                dispatch(addTaskAC(todolistId, res.data.data.item))
                dispatch(setAppStatusAC("succeeded"))

            }
            if (res.data.resultCode === 1) {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
        handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, model: updateTaskModelType) =>
    (dispatch: Dispatch, getState: () => rootReducerType) => {
        dispatch(setAppStatusAC("loading"))
        const state = getState();
        const task = state.tasks[todolistId].find(el => el.id === taskId)
        if (!task) {
            //throw new Error("task not found in the store");
            console.warn('task not found in the store')
            return
        }
        const apiModel: updateTaskRequestModel = {
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            ...model,
        }
        todolistAPI.updateTask(todolistId, taskId, apiModel)
            .then(res=>{
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(todolistId, taskId, res.data.data.item))
                    dispatch(setAppStatusAC("succeeded"))
                }
                if (res.data.resultCode === 1) {
                    handleServerAppError(res.data, dispatch)
                }
            }).catch(error => {
            handleServerNetworkError(error, dispatch)
            })
    }
