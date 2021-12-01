
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar/Snackbar';
import React, {memo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../store/store";
import {AppReducerInitialStateType, setErrorLogAC} from "../store/reducers/appReducer";


export const ErrorSnackBar = memo(() => {
    const dispatch = useDispatch()

    const app = useSelector<rootReducerType, AppReducerInitialStateType>(store => store.app)


    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={3} ref={ref} variant="filled" {...props} />;
    });

    const onSnackBarClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setErrorLogAC(null))
    };

    return (
        <Snackbar open={app.errorLog!==null} autoHideDuration={12000} onClose={onSnackBarClose}>
            <Alert onClose={onSnackBarClose} severity="error" sx={{width: '100%'}}>
                {app.errorLog}
            </Alert>
        </Snackbar>
    );
});

