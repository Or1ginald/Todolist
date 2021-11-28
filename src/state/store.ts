import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todDoListsReducer} from "./todolists-reducer";
import thunk from "redux-thunk";
import {AppReducer} from "../App/AppReducer";
import {authReducer} from "../features/Login/authReducer";



const rootReducer = combineReducers({
    tasks: tasksReducer,
    toDoLists: todDoListsReducer,
    app:AppReducer,
    auth: authReducer
})

 export type rootReducerType = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer, applyMiddleware(thunk))


// @ts-ignore
window.store = store