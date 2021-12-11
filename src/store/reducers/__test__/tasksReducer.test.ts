import {
  addTaskAC,
  deleteTaskAC,
  setTasksAC,
  tasksReducer,
  tasksType,
  taskType,
  updateTaskAC,
  updateTaskModelType,
} from 'store';

describe('app reducer', () => {
  let initialState: tasksType;
  let ToDoListId1: string;
  let ToDoListId2: string;
  let ToDoListId3: string;

  beforeEach(() => {
    ToDoListId1 = '1';
    ToDoListId2 = '2';
    ToDoListId3 = '3';
    initialState = {
      [ToDoListId1]: [
        {
          addedDate: '2021-11-28T14:58:04.617',
          deadline: null,
          description: null,
          id: '5428afc4-315c-45e0-8581-fdfacb1dbaa1',
          order: -4,
          priority: 1,
          startDate: null,
          status: 0,
          title: 'lala',
          todoListId: ToDoListId1,
          completed: true,
        },
        {
          addedDate: '2021-11-28T14:52:12.977',
          deadline: null,
          description: null,
          id: 'd1a0f580-bdc9-458c-9a2a-cf45ffe096d3',
          order: -3,
          priority: 1,
          startDate: null,
          status: 2,
          title: 'd',
          todoListId: ToDoListId1,
          completed: false,
        },
      ],
      [ToDoListId2]: [
        {
          id: 'c4ede16b-272d-4fe6-aac9-41cc949e1145',
          title: 'Eat',
          description: null,
          todoListId: ToDoListId2,
          order: -2,
          status: 0,
          priority: 1,
          startDate: null,
          deadline: null,
          addedDate: '2021-11-08T17:51:20.793',
          completed: true,
        },
        {
          id: '4a15b272-af02-451b-aad3-57bbf80d9f54',
          title: 'Sleep',
          description: null,
          todoListId: ToDoListId2,
          order: -1,
          status: 0,
          priority: 1,
          startDate: null,
          deadline: null,
          addedDate: '2021-11-08T17:51:14.513',
          completed: false,
        },
      ],
      [ToDoListId3]: [],
    };
  });

  it('should delete task', () => {
    const action = deleteTaskAC(ToDoListId1, 'd1a0f580-bdc9-458c-9a2a-cf45ffe096d3');
    expect(tasksReducer(initialState, action)[ToDoListId1].length).toBe(1);
    expect(
      tasksReducer(initialState, action)[ToDoListId1][0].title,
    ).toBe('lala');
    expect(
      tasksReducer(initialState, action)[ToDoListId1][0].title,
    ).not.toBe('d');
  });
  it('should update task', () => {
    const task: updateTaskModelType = {
      title: 'More sleep',
      description: null,
      status: 0,
      priority: 1,
      startDate: null,
      deadline: null,
    };

    const action = updateTaskAC(
      ToDoListId2,
      'c4ede16b-272d-4fe6-aac9-41cc949e1145',
      task,
    );
    expect(tasksReducer(initialState, action)[ToDoListId2].length).toBe(2);
    expect(
      tasksReducer(initialState, action)[ToDoListId2][0].title,
    ).toBe('More sleep');
    expect(
      tasksReducer(initialState, action)[ToDoListId2][0].title,
    ).not.toBe('Eat');
  });
  it('should add task', () => {
    const newTask: taskType = {
      id: '3',
      title: 'New Task',
      description: null,
      todoListId: ToDoListId2,
      order: -1,
      status: 0,
      priority: 1,
      startDate: null,
      deadline: null,
      addedDate: '2021-12-08T17:51:14.513',
      completed: false,
    };

    const action = addTaskAC(ToDoListId2, newTask);
    expect(tasksReducer(initialState, action)[ToDoListId2].length).toBe(3);
    expect(
      tasksReducer(initialState, action)[ToDoListId2][0].title,
    ).toBe('New Task');
    expect(tasksReducer(initialState, action)[ToDoListId2][0].id).toBe(
      '3',
    );
    expect(tasksReducer(initialState, action)[ToDoListId2]).toStrictEqual([
      newTask,
      ...initialState[ToDoListId2],
    ]);
  });
  it('should set tasks', () => {
    const tasks: Array<taskType> = [
      {
        id: 'c4ede16b-272d-4fe6',
        title: 'Buy Milk',
        description: null,
        todoListId: ToDoListId3,
        order: -2,
        status: 0,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: '2021-04-08T17:51:20.793',
        completed: true,
      },
      {
        id: '4a15b272-af02-451b',
        title: 'Buy meat',
        description: null,
        todoListId: ToDoListId3,
        order: -1,
        status: 0,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: '2021-07-08T17:51:14.513',
        completed: false,
      },
    ];
    const action = setTasksAC(tasks, ToDoListId3);
    expect(tasksReducer(initialState, action)[ToDoListId3]).toStrictEqual(tasks);
  });
});
