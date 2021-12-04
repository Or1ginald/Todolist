import React, { useCallback, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { addToDoListTC, setTodosTC } from '../store/reducers/todolistsReducer';
import { rootReducerType } from '../store/store';

import { InputPlusButton } from './InputPlusButton/InputPlusButton';
import { ToDoList } from './To-DoList.tsx/To-DoList';

import { ReturnComponentType } from 'types';

export const ToDoLists = (): ReturnComponentType => {
  const dispatch = useDispatch();

  const { toDoLists, tasks } = useSelector<rootReducerType, rootReducerType>(
    store => store,
  );
  const isLoggedIn = useSelector<rootReducerType, boolean>(
    store => store.auth.isLoggedIn,
  );

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(setTodosTC);
  }, [dispatch, isLoggedIn]);

  const handleAddTodolistClick = useCallback(
    (title: string): void => {
      dispatch(addToDoListTC(title));
    },
    [dispatch],
  );

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Grid container style={{ padding: '20px', width: '100%' }}>
        <InputPlusButton
          addCallBack={handleAddTodolistClick}
          label="Add Todolist"
          disabled={false}
        />
      </Grid>
      <Grid container spacing={3}>
        {toDoLists.map(todolist => (
          <Grid item key={todolist.id}>
            <Paper style={{ padding: '10px' }}>
              <ToDoList
                key={todolist.id}
                toDoListId={todolist.id}
                title={todolist.title}
                filter={todolist.filter}
                tasks={tasks[todolist.id]}
                entityStatus={todolist.entityStatus}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
