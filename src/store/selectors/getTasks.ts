import { rootStateType } from '../types';

import { tasksType } from 'store';

export const getTasks = (state: rootStateType): tasksType => state.tasks;
