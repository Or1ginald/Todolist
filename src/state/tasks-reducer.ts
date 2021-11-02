import {v1} from "uuid";
import {tasksType, taskType} from "../App";
import {
    addToDoListACType,
    deleteToDoListACType,
    setTodosAC,
    setTodosACType,
    ToDoListId1,
    ToDoListId2
} from "./todolists-reducer";


/*------------Types---------------*/
type mainActionType =
    deleteTaskACType
    | changeTaskTitleACType
    | changeTaskStatusACType
    | addTaskACType
    | addToDoListACType
    | deleteToDoListACType
    | setTodosACType
type deleteTaskACType = ReturnType<typeof deleteTaskAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type addTaskACType = ReturnType<typeof addTaskAC>
/*------------Types---------------*/

// type taskType = {
//     description: string
//     title: string
//     completed: boolean
//     status:number
//     priority: number
//     startDate: required(datetime)
//     deadline: required(datetime)
//     id: required(string)
//     todoListId: required(string)
//     order: required(integer)
//     addedDate: required(datetime)
// }

const initialState: tasksType = {
    [ToDoListId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [ToDoListId2]: [
        {id: v1(), title: "HTML&CSS2", isDone: true},
        {id: v1(), title: "JS2", isDone: true},
        {id: v1(), title: "ReactJS2", isDone: false},
        {id: v1(), title: "Rest API2", isDone: false},
        {id: v1(), title: "GraphQL2", isDone: false},
    ]
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
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
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
export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: "ADD-TASK",
        todolistId,
        title,
    } as const
}
export const setTasksAC = (tasks: Array<taskType>)=> {}
/*------------Action Creators---------------*/