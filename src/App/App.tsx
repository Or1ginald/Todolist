import React, {useEffect} from 'react';

import './App.css';
import {setTodosTC} from "../state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../state/store";

import {ErrorSnackBar} from "../components/ErrorSnackBar";
import Box from '@mui/material/Box/Box';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import Container from '@mui/material/Container/Container';
import {ToDoLists} from "../components/To-DoLists";
import {AppReducerInitialStateType} from "./AppReducer";
import {Login} from '../features/Login/Login';
import {Navigate, Route, Routes} from 'react-router-dom';
import {authMeTC} from "../features/Login/authReducer";


export const App = React.memo(() => {
    const dispatch = useDispatch()

    const app = useSelector<rootReducerType, AppReducerInitialStateType>(store => store.app)
    const isLoggedIn = useSelector<rootReducerType, boolean>(store => store.auth.isLoggedIn)

    useEffect(()=>{
        dispatch(authMeTC())
    },[dispatch])

    // useEffect(() => {
    //     if(!isLoggedIn){
    //         return
    //     }
    //     dispatch(setTodosTC)
    // }, [dispatch, isLoggedIn])

    return (
        <div className="App">
            {/*<AppBar position="static">*/}
            {/*    <Toolbar>*/}
            {/*        <IconButton edge="start" color="inherit" aria-label="menu">*/}
            {/*            <Menu/>*/}
            {/*        </IconButton>*/}
            {/*        <Typography variant="h6">*/}
            {/*            News*/}
            {/*        </Typography>*/}
            {/*        <Button color="inherit">Login</Button>*/}
            {/*    </Toolbar>*/}
            {/*    <LinearProgress/>*/}
            {/*</AppBar>*/}
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

