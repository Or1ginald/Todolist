import React, { useEffect } from 'react';

import './App.css';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container/Container';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AppReducerInitialStateType } from '../store/reducers/appReducer';
import { authMeTC, logOutTC } from '../store/reducers/authReducer';
import { rootReducerType } from '../store/store';

import { Login, ToDoLists, ErrorSnackBar } from 'components';

export const App = React.memo(() => {
  const dispatch = useDispatch();

  const app = useSelector<rootReducerType, AppReducerInitialStateType>(
    store => store.app,
  );
  // const isLoggedIn = useSelector<rootReducerType, boolean>(store => store.auth.isLoggedIn)

  useEffect(() => {
    dispatch(authMeTC());
  }, [dispatch]);

  if (!app.isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="title">
            That is a list for a things to do
          </Typography>
          <Button color="inherit" onClick={() => dispatch(logOutTC())}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>

      <Box height={5}>{app.status === 'loading' && <LinearProgress />}</Box>
      <ErrorSnackBar />

      <Container fixed>
        <Routes>
          <Route path="/" element={<ToDoLists />} />
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<h1>404</h1>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
        {/* <ToDoLists/> */}
        {/* <Login/> */}
      </Container>
    </div>
  );
});
