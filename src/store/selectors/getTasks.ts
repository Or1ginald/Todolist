import { tasksType } from '../reducers/tasksReducer';
import { rootStateType } from '../types';

export const getTasks = (state: rootStateType): tasksType => state.tasks;
