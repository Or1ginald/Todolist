import {
    addToDoListACType,
    deleteToDoListACType,
    setTodosACType,
} from "./todolists-reducer";
import {Dispatch} from "redux";
import {todolistAPI} from "../api/todolists-api";


/*------------Types---------------*/
type mainActionType =
    deleteTaskACType
    | changeTaskTitleACType
    | changeTaskStatusACType
    | addTaskACType
    | addToDoListACType
    | deleteToDoListACType
    | setTodosACType
    | setTasksACType

type deleteTaskACType = ReturnType<typeof deleteTaskAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type setTasksACType = ReturnType<typeof setTasksAC>

/*------------Types---------------*/

export type tasksType = {
    [key: string]: taskType[]
}

export type taskType = {
    description: string | null
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
            //     return {...state, [el.id]: []}
            // })
            let a = {...state}
            action.todos.forEach(el => {
                a[el.id] = []
            })
            return a
        }
        case "DELETE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(e => e.id !== action.taskId)}
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(e => e.id === action.taskId ? {
                    ...e,
                    title: action.title
                } : e)
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
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        todolistId,
        taskId,
        title,
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
    todolistAPI.getTasks(todolistId).then(res => {
        dispatch(setTasksAC(res.data.items, todolistId))
    });
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(deleteTaskAC(todolistId, taskId))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(todolistId, res.data.data.item))
            console.log(res)
        })
}
