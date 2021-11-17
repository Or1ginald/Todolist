import React, {memo} from 'react';
import {Alert, Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../state/store";
import {AppReducerInitialStateType, setErrorLogAC} from "./App/AppReducer";

export const ErrorSnackBar = memo(() => {
    const dispatch = useDispatch()

    const app = useSelector<rootReducerType, AppReducerInitialStateType>(store => store.app)

    const onSnackBarClose = () => {
        dispatch(setErrorLogAC(null))
    }

    return (
        <Snackbar open={app.errorLog!==null} autoHideDuration={12000} onClose={onSnackBarClose}>
            <Alert onClose={onSnackBarClose} severity="error" sx={{width: '100%'}}>
                {app.errorLog}
            </Alert>
        </Snackbar>
    );
});

