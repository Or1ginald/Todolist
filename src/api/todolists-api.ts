import axios, { AxiosResponse } from 'axios';

import { taskType } from 'store';
import { Nullable } from 'types';

export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: D;
};

type UserParamsType = {
  id: number;
  email: string;
  login: string;
};

type GetTasksResponseType = {
  error: string;
  totalCount: number;
  items: Array<taskType>;
};

export type UpdateTaskRequestModel = {
  title: string;
  description: Nullable<string>;
  status: TaskStatuses;
  priority: number;
  startDate: Nullable<string>;
  deadline: Nullable<string>;
};

export enum TaskStatuses {
  New = 0,
  // InProgress = 1,
  Completed = 2,
  // Draft = 3
}

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: boolean;
};

const key: string = process.env.REACT_APP_API_KEY ?? '';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': key,
  },
});

export const todolistAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>('todo-lists');
  },
  createTodolist(title: string) {
    return instance.post<
      { title: string },
      AxiosResponse<ResponseType<{ item: TodolistType }>>
    >('todo-lists', { title });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<{ title: string }, AxiosResponse<ResponseType>>(
      `todo-lists/${todolistId}`,
      { title },
    );
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<
      { title: string },
      AxiosResponse<ResponseType<{ item: taskType }>>
    >(`todo-lists/${todolistId}/tasks`, { title });
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskRequestModel) {
    return instance.put<
      UpdateTaskRequestModel,
      AxiosResponse<ResponseType<{ item: taskType }>>
    >(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
};

export const authAPI = {
  login(email: string, password: string, rememberMe: boolean) {
    return instance.post<
      LoginParamsType,
      AxiosResponse<ResponseType<{ userId: number }>>
    >('auth/login', {
      email,
      password,
      rememberMe,
    });
  },
  me() {
    return instance.get<ResponseType<UserParamsType>>('auth/me');
  },
  logOut() {
    return instance.delete<ResponseType>('auth/login');
  },
};
