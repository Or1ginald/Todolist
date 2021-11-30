import {Nullable} from "../Types/Nullable";

export type requestStatusType = "loading" | "idle" | "succeeded" | "failed"

export type AppReducerInitialStateType = {
    status: requestStatusType,
    errorLog: Nullable<string>,
    isInitialized: boolean,
}

export const AppReducerInitialState: AppReducerInitialStateType = {
    status: "idle",
    errorLog: null,
    isInitialized: false,
}

export type setStatusACType = ReturnType<typeof setAppStatusAC>
export type setErrorLogACType = ReturnType<typeof setErrorLogAC>
export type setIsInitializedACType = ReturnType<typeof setIsInitializedAC>

type mainActionType = setStatusACType | setErrorLogACType | setIsInitializedACType

export const AppReducer = (state: AppReducerInitialStateType = AppReducerInitialState, action: mainActionType): AppReducerInitialStateType => {
    switch (action.type) {
        case "APP/SET_STATUS": {
            return {...state, status: action.status}
        }
        case "APP/SET_ERROR_LOG": {
            return {...state, errorLog: action.error}
        }
        case "APP/SET_INITIALIZE_STATUS": {
            return {...state, isInitialized: action.isInitialized}
        }
        default:
            return state
    }
}


export const setAppStatusAC = (status: requestStatusType) => {
    return {
        type: "APP/SET_STATUS",
        status,
    } as const
}
export const setErrorLogAC = (error: Nullable<string>) => {
    return {
        type: "APP/SET_ERROR_LOG",
        error,
    } as const
}

export const setIsInitializedAC = (isInitialized: boolean) => {
  return {
      type: "APP/SET_INITIALIZE_STATUS",
      isInitialized,
  } as const
}