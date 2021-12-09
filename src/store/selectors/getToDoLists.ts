import { ToDoListsType } from '../reducers/todolistsReducer';
import { rootStateType } from '../types';

export const getToDoLists = (state: rootStateType): ToDoListsType[] => state.toDoLists;
