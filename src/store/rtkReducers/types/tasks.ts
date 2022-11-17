import { Nullable } from 'types';

export type tasksType = {
  [key: string]: taskType[];
};

export type taskType = {
  description: Nullable<string>;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: Nullable<string>;
  deadline: Nullable<string>;
  id: string;
  todoListId: string;
  order: number;
  addedDate: Nullable<string>;
};

export type updateTaskModelType = {
  title?: string;
  description?: Nullable<string>;
  status?: number;
  priority?: number;
  startDate?: Nullable<string>;
  deadline?: Nullable<string>;
};
