
type requestStatusType = "loading" | "idle" | "succeeded" | "failed"

export type AppReducerInitialStateType = {
    status: requestStatusType,
}

export const AppReducerInitialState: AppReducerInitialStateType = {
    status: "idle",
}

type setStatusACType = ReturnType<typeof setAppStatusAC>

type mainActionType = setStatusACType

export const AppReducer = (state: AppReducerInitialStateType = AppReducerInitialState, action: mainActionType): AppReducerInitialStateType => {
    switch (action.type) {
        case "SET_STATUS": {
            return {...state, status: action.status}
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