import { TodolistType } from 'api/todolists-api';
import { requestStatusType } from 'types';

export type filterType = 'All' | 'Active' | 'Completed';

export type todDoListsType = Array<
  TodolistType & {
    filter: filterType;
    entityStatus: requestStatusType;
  }
>;
