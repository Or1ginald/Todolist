import React, { memo } from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar/Snackbar';
import { useDispatch } from 'react-redux';

import { setErrorLogAC } from '../../store/reducers/appReducer';

import { useAppSelector } from 'hooks';
import { getAppState } from 'store';

export const ErrorSnackBar = memo(() => {
  const dispatch = useDispatch();

  const app = useAppSelector(getAppState);

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MuiAlert elevation={3} ref={ref} variant="filled" {...props} />
  ));

  const onSnackBarClose = (event?: React.SyntheticEvent, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setErrorLogAC(null));
  };

  return (
    <Snackbar
      open={app.errorLog !== null}
      autoHideDuration={12000}
      onClose={onSnackBarClose}
    >
      <Alert onClose={onSnackBarClose} severity="error" sx={{ width: '100%' }}>
        {app.errorLog}
      </Alert>
    </Snackbar>
  );
});
