import { RootStateType } from '../types';

import { tasksType } from 'store';

export const getTasks = (state: RootStateType): tasksType => state.tasks;
