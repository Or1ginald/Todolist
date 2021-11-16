
type requestStatusType = "loading" | "idle" | "succeeded" | "failed"

export type AppReducerInitialStateType = {
    status: requestStatusType,
    errorLog: string,
}

export const AppReducerInitialState: AppReducerInitialStateType = {
    status: "idle",
    errorLog: "",
}

type setStatusACType = ReturnType<typeof setAppStatusAC>
type setErrorLogACType = ReturnType<typeof setErrorLogAC>

type mainActionType = setStatusACType | setErrorLogACType

export const AppReducer = (state: AppReducerInitialStateType = AppReducerInitialState, action: mainActionType): AppReducerInitialStateType => {
    switch (action.type) {
        case "SET_STATUS": {
            return {...state, status: action.status}
        }
        case "SET_ERROR_LOG": {
            return {...state, errorLog: action.error}
        }
        default:
            return state
    }
}


export const setAppStatusAC = (status: requestStatusType) => {
    return {
        type: "SET_STATUS",
        status,
    } as const
}
export const setErrorLogAC = (error: string) => {
    return {
        type: "SET_ERROR_LOG",
        error,
    } as const
}