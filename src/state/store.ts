import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todDoListsReducer} from "./todolists-reducer";
import thunk from "redux-thunk";



const rootReducer = combineReducers({
    tasks: tasksReducer,
    toDoLists: todDoListsReducer
})

 export type rootReducerType = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer, applyMiddleware(thunk))


// @ts-ignore
window.store = store