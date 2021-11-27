type authReducerInitStateType = typeof authReducerInitState
type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
type mainActionType = setIsLoggedInACType

const authReducerInitState = {
    isLoggedIn: false
}


export const authReducer = (state: authReducerInitStateType = authReducerInitState, action: mainActionType): authReducerInitStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.value}
        }

        default:
            return state
    }
}

const setIsLoggedInAC = (value: boolean) => {
    return {
        type: 'login/SET-IS-LOGGED-IN',
        value
    } as const
}