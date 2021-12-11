import { rootStateType } from '../types';

import { todDoListsType } from 'store';

export const getToDoLists = (state: rootStateType): todDoListsType => state.toDoLists;
