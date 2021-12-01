import React, {useEffect} from 'react';

import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../store/store";

import {ErrorSnackBar} from "../components/ErrorSnackBar";
import Box from '@mui/material/Box/Box';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import Container from '@mui/material/Container/Container';
import {ToDoLists} from "../components/To-DoLists";
import {AppReducerInitialStateType} from "../store/reducers/appReducer";
import {Login} from '../features/Login/Login';
import {Navigate, Route, Routes} from 'react-router-dom';
import {authMeTC, logOutTC} from "../store/reducers/authReducer";
import CircularProgress from "@mui/material/CircularProgress";
import {AppBar, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";


export const App = React.memo(() => {
    const dispatch = useDispatch()

    const app = useSelector<rootReducerType, AppReducerInitialStateType>(store => store.app)
    // const isLoggedIn = useSelector<rootReducerType, boolean>(store => store.auth.isLoggedIn)

    useEffect(()=>{
        dispatch(authMeTC())
    },[dispatch])

    if (!app.isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className="title">
                        That's a list for a things to do
                    </Typography>
                    <Button color="inherit" onClick={()=>dispatch(logOutTC())}>Log out</Button>
                </Toolbar>
            </AppBar>

            <Box height={5}>
                {app.status === "loading" && <LinearProgress/>}
            </Box>
            <ErrorSnackBar/>

            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<ToDoLists/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/404"} element={<h1>404</h1>}/>
                    <Route path="*" element={<Navigate to={"/404"} />}/>

                </Routes>
                {/*<ToDoLists/>*/}
                {/*<Login/>*/}
            </Container>
        </div>
    );
})

