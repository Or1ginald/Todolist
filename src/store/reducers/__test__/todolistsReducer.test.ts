import { ARRAY_ELEMENT_ZERO } from '../../../constants/baseConstants';
import {
  addToDoListAC,
  changeTodolistEntityStatusAC,
  changeToDoListFilterAC,
  deleteToDoListAC,
  editToDoListTitleAC,
  setTodosAC,
  todDoListsReducer,
  ToDoListsType,
} from '../todolistsReducer';

import { FOUR, ONE, THREE, TWO } from './constants';

describe('app reducer', () => {
  let initialState: Array<ToDoListsType>;

  beforeEach(() => {
    initialState = [
      {
        addedDate: '2021-11-28T15:09:21.873',
        id: 'e4f0d523-a4d7-4f86-93b9-aa4cdac92716',
        order: -10,
        title: 'Need to watch',
        filter: 'All',
        entityStatus: 'idle',
      },
      {
        addedDate: '2021-11-25T12:44:43.753',
        id: '2f7a7720-3a82-4b12-ad48-afd516d0535f',
        order: -9,
        title: 'hello',
        filter: 'All',
        entityStatus: 'idle',
      },
      {
        addedDate: '2021-12-25T12:44:43.753',
        id: '2f7a7720-3a82-4b62-ad48-afd516d0535f',
        order: -8,
        title: 'Random name',
        filter: 'All',
        entityStatus: 'idle',
      },
    ];
  });

  it('should delete todolist', () => {
    const action = deleteToDoListAC('2f7a7720-3a82-4b12-ad48-afd516d0535f');
    expect(todDoListsReducer(initialState, action).length).toBe(TWO);
    expect(todDoListsReducer(initialState, action)[ARRAY_ELEMENT_ZERO].title).toBe(
      'Need to watch',
    );
    expect(todDoListsReducer(initialState, action)[ONE].title).toBe('Random name');
  });
  it('should add todolist', () => {
    const action = addToDoListAC('New Todo', 'New Id');
    expect(todDoListsReducer(initialState, action).length).toBe(FOUR);
    expect(todDoListsReducer(initialState, action)[ARRAY_ELEMENT_ZERO].title).toBe(
      'New Todo',
    );
    expect(todDoListsReducer(initialState, action)[ARRAY_ELEMENT_ZERO].id).toBe('New Id');
  });
  it("should change todolist's title", () => {
    const action = editToDoListTitleAC(
      '2f7a7720-3a82-4b62-ad48-afd516d0535f',
      'New Title',
    );
    expect(todDoListsReducer(initialState, action).length).toBe(THREE);
    expect(todDoListsReducer(initialState, action)[TWO].title).toBe('New Title');
    expect(todDoListsReducer(initialState, action)[TWO].id).toBe(
      '2f7a7720-3a82-4b62-ad48-afd516d0535f',
    );
  });
  it("should change todolist's filter", () => {
    const action = changeToDoListFilterAC(
      '2f7a7720-3a82-4b62-ad48-afd516d0535f',
      'Active',
    );
    expect(todDoListsReducer(initialState, action).length).toBe(THREE);
    expect(todDoListsReducer(initialState, action)[TWO].filter).toBe('Active');
    expect(todDoListsReducer(initialState, action)[ARRAY_ELEMENT_ZERO].filter).toBe(
      'All',
    );
    expect(todDoListsReducer(initialState, action)[ONE].filter).toBe('All');
  });
  it('should set todos', () => {
    const arr = [
      {
        addedDate: '2021-11-28T15:09:21.873',
        id: 'e4f0d523-a4d7-4f86-93b9-aa4cdac92716',
        order: -10,
        title: 'Need to watch',
      },
      {
        addedDate: '2021-11-25T12:44:43.753',
        id: '2f7a7720-3a82-4b12-ad48-afd516d0535f',
        order: -9,
        title: 'hello',
      },
    ];
    const action = setTodosAC(arr);
    expect(todDoListsReducer(initialState, action)[ARRAY_ELEMENT_ZERO]).toStrictEqual(
      initialState[ARRAY_ELEMENT_ZERO],
    );
    expect(todDoListsReducer(initialState, action)[ONE]).toStrictEqual(initialState[ONE]);
  });
  it("should change todolist's entity status", () => {
    const action = changeTodolistEntityStatusAC(
      '2f7a7720-3a82-4b62-ad48-afd516d0535f',
      'succeeded',
    );
    expect(todDoListsReducer(initialState, action)[TWO].entityStatus).toBe('succeeded');
    expect(todDoListsReducer(initialState, action)[TWO].id).toBe(
      '2f7a7720-3a82-4b62-ad48-afd516d0535f',
    );
  });
});
