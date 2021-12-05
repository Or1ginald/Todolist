import React, { ChangeEvent, useCallback } from 'react';
/* eslint-disable react/jsx-props-no-spreading */

import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';

import { TaskStatuses } from '../../api/todolists-api';
import { deleteTaskTC, updateTaskTC } from '../../store/reducers/tasksReducer';

import { ChangeText } from 'components';

type TaskPropsType = {
  toDoListId: string;
  id: string;
  status: TaskStatuses;
  title: string;
  // onChangeCallback: (event: ChangeEvent<HTMLInputElement>) => void
};

export const Task = React.memo((props: TaskPropsType) => {
  // debugger
  const { id, title, status } = props;
  // console.log("one task render")

  const dispatch = useDispatch();

  const changeCheckBoxStatus = (event: ChangeEvent<HTMLInputElement>): void => {
    const { checked } = event.currentTarget;
    const model = checked
      ? { status: TaskStatuses.Completed }
      : { status: TaskStatuses.New };
    dispatch(updateTaskTC(props.toDoListId, props.id, model));
  };

  const editTaskTitle = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (title: string): void => {
      dispatch(updateTaskTC(props.toDoListId, props.id, { title }));
    },
    [dispatch, props.toDoListId, props.id],
  );

  const deleteTask = (): void => {
    dispatch(deleteTaskTC(props.toDoListId, props.id));
  };
  const label = { inputProps: { 'aria-label': 'Task Status' } };
  return (
    <li key={id}>
      <Checkbox
        {...label}
        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
        checked={status === TaskStatuses.Completed}
        onChange={changeCheckBoxStatus}
      />
      <ChangeText title={title} callBack={editTaskTitle} />
      <IconButton aria-label="delete" size="large" onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </li>
  );
});
