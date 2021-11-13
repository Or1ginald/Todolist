export type AppReducerInitialStateType = {
    status: boolean,
}

export const AppReducerInitialState: AppReducerInitialStateType = {
    status: false,
}

type setStatusACType = ReturnType<typeof setStatusAC>

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


const setStatusAC = (status: boolean) => {
    return {
        type: "SET_STATUS",
        status,
    } as const
}