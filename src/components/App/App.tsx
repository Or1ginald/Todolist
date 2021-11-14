import React, {useCallback, useEffect} from 'react';

import './App.css';
import {ToDoList} from "../ToDoList/ToDoList";
import {InputPlusButton} from "../InputPlusButton/InputPlusButton";
import {
    addToDoListTC, setTodosTC, ToDoListsType,
} from "../../state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../../state/store";
import {tasksType} from "../../state/tasks-reducer";
import {
    // AppBar,
    Box,
    // Button,
    Container,
    Grid,
    // IconButton,
    LinearProgress,
    Paper,
    // Toolbar,
    // Typography
} from '@mui/material'
import { AppReducerInitialStateType } from './AppReducer';
// import {Menu} from "@mui/icons-material";

export const App = React.memo(() => {
    const dispatch = useDispatch()
    const toDoLists = useSelector<rootReducerType, Array<ToDoListsType>>(store => store.toDoLists)
    const tasks = useSelector<rootReducerType, tasksType>(store => store.tasks)
    const app = useSelector<rootReducerType, AppReducerInitialStateType>(store => store.AppReducer)


    /*-------Functions--------*/
    const addToDoList = useCallback((title: string) => {
        dispatch(addToDoListTC(title))
    }, [dispatch])
    useEffect(() => {
        dispatch(setTodosTC)
    }, [dispatch])


    /*-------Component--------*/
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
                {app.status==="loading"&&<LinearProgress/>}
            </Box>
            {/**/}

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <InputPlusButton addCallBack={addToDoList} label={"Add Todolist"}/>
                </Grid>
                <Grid container spacing={3}>
                    {toDoLists.map(e => {
                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <ToDoList
                                        key={e.id}
                                        toDoListId={e.id}
                                        title={e.title}
                                        filter={e.filter}
                                        tasks={tasks[e.id]}/>
                                </Paper>
                            </Grid>
                        }
                    )}
                </Grid>
            </Container>
        </div>
    );
})

