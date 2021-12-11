import React, { useCallback, useEffect } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';

import { TaskStatuses } from '../../api/todolists-api';

import { ChangeText, InputPlusButton, Task } from 'components';
import {
  changeToDoListFilterAC,
  filterType,
  taskType,
  addTaskTC,
  deleteToDoListTC,
  editToDoListTitleTC,
  setTasksTC,
} from 'store';
import { requestStatusType } from 'types';

type ToDoListPropsType = {
  toDoListId: string;
  title: string;
  tasks: taskType[];
  filter: filterType;
  entityStatus: requestStatusType;
};

export const ToDoList = React.memo((props: ToDoListPropsType) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTasksTC(props.toDoListId));
  }, [dispatch, props.toDoListId]);

  /* -------Functions--------*/

  const onFilterButtonClick = useCallback(
    (filter: filterType): void => {
      dispatch(changeToDoListFilterAC(props.toDoListId, filter));
    },
    [dispatch, props.toDoListId],
  );

  const onDeleteButtonClick = useCallback(
    (toDoListId: string): void => {
      dispatch(deleteToDoListTC(toDoListId));
    },
    [dispatch],
  );

  const handleAddTaskClick = useCallback(
    (title: string): void => {
      dispatch(addTaskTC(props.toDoListId, title));
    },
    [dispatch, props.toDoListId],
  );

  const editToDoListTitle = useCallback(
    (title: string): void => {
      dispatch(editToDoListTitleTC(props.toDoListId, title));
    },
    [dispatch, props.toDoListId],
  );

  let tasksList = props.tasks;
  if (props.filter === 'Completed') {
    tasksList = props.tasks.filter(e => e.status === TaskStatuses.Completed);
  }
  if (props.filter === 'Active') {
    tasksList = props.tasks.filter(e => e.status === TaskStatuses.New);
  }

  return (
    <div>
      <h3>
        <ChangeText title={props.title} callBack={editToDoListTitle} />
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => onDeleteButtonClick(props.toDoListId)}
          disabled={props.entityStatus === 'loading'}
        >
          <DeleteIcon />
        </IconButton>
      </h3>
      <InputPlusButton
        addCallBack={handleAddTaskClick}
        label="Add Task"
        disabled={props.entityStatus === 'loading'}
      />
      <ul>
        {tasksList.map(task => (
          <Task
            key={task.id}
            id={task.id}
            status={task.status}
            title={task.title}
            toDoListId={props.toDoListId}
          />
        ))}
      </ul>
      <ButtonGroup color="primary" aria-label="medium secondary button group">
        <Button onClick={() => onFilterButtonClick('All')}>All</Button>
        <Button onClick={() => onFilterButtonClick('Active')}>Active</Button>
        <Button onClick={() => onFilterButtonClick('Completed')}>Completed</Button>
      </ButtonGroup>
    </div>
  );
});
