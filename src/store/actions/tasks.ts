import { taskType, updateTaskModelType } from 'store';

export const deleteTaskAC = (todolistId: string, taskId: string) =>
  ({
    type: 'TASKS/DELETE-TASK',
    todolistId,
    taskId,
  } as const);
export const updateTaskAC = (
  todolistId: string,
  taskId: string,
  task: updateTaskModelType,
) =>
  ({
    type: 'TASKS/UPDATE_TASK',
    todolistId,
    taskId,
    task,
  } as const);

export const addTaskAC = (todolistId: string, task: taskType) =>
  ({
    type: 'TASKS/ADD-TASK',
    todolistId,
    task,
  } as const);
export const setTasksAC = (tasks: Array<taskType>, todolistId: string) =>
  ({
    type: 'TASKS/SET_TASKS',
    tasks,
    todolistId,
  } as const);
