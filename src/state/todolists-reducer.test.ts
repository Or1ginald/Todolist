import {
    addToDoListAC,
    changeToDoListFilterAC,
    deleteToDoListAC,
    editToDoListTitleAC,
    todDoListsReducer,
    ToDoListsType
} from './todolists-reducer';
import {v1} from "uuid";

let ToDoListId1 = v1();
let ToDoListId2 = v1();
const startState: Array<ToDoListsType> = [
    {id: ToDoListId1, title: 'What to learn', filter: 'All', addedDate: "", order: 1},
    {id: ToDoListId2, title: 'What to buy', filter: 'All' ,addedDate: "", order: 2},
];

test('deleteTodolist', () => {
    const endState = todDoListsReducer([...startState], deleteToDoListAC(ToDoListId1));
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(ToDoListId2)
});

test("addTodolist", () => {
    const endState = todDoListsReducer([...startState], addToDoListAC("Shopping List"))
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe("Shopping List")
})

test("Edit todolist title", () => {
    const endState = todDoListsReducer([...startState], editToDoListTitleAC(ToDoListId2, "To Read List"))
    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe("To Read List")
    expect(endState[0].title).toBe("What to learn")
})

test("Change todolist filter", () => {
    const endState = todDoListsReducer(startState, changeToDoListFilterAC(ToDoListId1, "Completed"))
    expect(endState[0].filter).toBe("Completed")
    expect(endState[1].filter).toBe("All")
})
