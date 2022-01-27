import { RootStateType } from '../types';

import { todDoListsType } from 'store';

export const getToDoLists = (state: RootStateType): todDoListsType => state.toDoLists;
