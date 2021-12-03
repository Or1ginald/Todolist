import {authAPI, loginParamsType} from "../../api/todolists-api";
import {setAppStatusAC, setIsInitializedAC} from "./appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {Dispatch} from "redux";

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

export const setIsLoggedInAC = (value: boolean) => {
    return {
        type: 'login/SET-IS-LOGGED-IN',
        value
    } as const
}

export const loginTC = (data: loginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.login(data.email, data.password, data.rememberMe)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC("succeeded"))
            }
            if (res.data.resultCode === 1) {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.logOut()
        .then(res => {
            console.log(res);
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC("succeeded"))
            }
            if (res.data.resultCode === 1) {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const authMeTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC("succeeded"))
            }
            if (res.data.resultCode === 1) {
                dispatch(setIsLoggedInAC(false))
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}