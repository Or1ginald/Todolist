import {
    setAppStatusAC,
    setErrorLogAC, setErrorLogACType,
    setStatusACType
} from '../App/AppReducer';
import {Dispatch} from 'redux';
import {ResponseType} from '../api/todolists-api';

// generic function
export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setErrorLogAC(data.messages[0]))
    } else {
        dispatch(setErrorLogAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setErrorLogAC(error.message))
    dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<setErrorLogACType | setStatusACType>