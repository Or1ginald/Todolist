import { todDoListsReducerActionType, todDoListsType } from 'store';

/* -------------types----------------*/
// export type todDoListsType = TodolistType & {
//   filter: filterType;
//   entityStatus: requestStatusType;
// };

/* -------------types----------------*/

const initialState: todDoListsType = [];

export const todDoListsReducer = (
  state: todDoListsType = initialState,
  action: todDoListsReducerActionType,
): todDoListsType => {
  switch (action.type) {
    case 'TO-DO_LISTS/DELETE-TODOLIST': {
      return state.filter(el => el.id !== action.toDoListId);
    }
    case 'TO-DO_LISTS/ADD-TODOLIST': {
      return [
        {
          id: action.todolistID,
          title: action.title,
          filter: 'All',
          order: 0,
          addedDate: '',
          entityStatus: 'idle',
        },
        ...state,
      ];
    }
    case 'TO-DO_LISTS/EDIT-TODOLIST-TITLE': {
      return state.map(el =>
        el.id === action.toDoListId ? { ...el, title: action.title } : el,
      );
    }
    case 'TO-DO_LISTS/CHANGE-FILTER': {
      return state.map(el =>
        el.id === action.toDoListId ? { ...el, filter: action.filter } : el,
      );
    }
    case 'TO-DO_LISTS/SET_TODOS': {
      return action.todos.map((el: any) => ({
        ...el,
        filter: 'All',
        entityStatus: 'idle',
      }));
    }
    case 'TO-DO_LISTS/CHANGE_TODOLIST_ENTITY_STATUS': {
      return state.map(el =>
        el.id === action.toDoListId ? { ...el, entityStatus: action.entityStatus } : el,
      );
    }
    default: {
      return state;
    }
  }
};
