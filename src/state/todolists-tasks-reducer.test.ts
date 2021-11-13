import {tasksReducer} from "./tasks-reducer";
import {addToDoListAC, deleteToDoListAC, todDoListsReducer} from "./todolists-reducer";
import {ToDoListsType} from "../components/App/App";

test("reducer should add empty array property to todolist", () => {
    const todolistsStartState: ToDoListsType = [];
    const tasksStartState = {};
    let action = addToDoListAC("New todolist title")
    
    const todolistsEndState = todDoListsReducer(todolistsStartState, action)
    const tasksEndState = tasksReducer(tasksStartState, action)

    let keys = Object.keys(tasksEndState)
    const idFromTasks = keys[0]
    const idFromTodolists = todolistsEndState[0].id
    expect(idFromTasks).toBe(action.todolistID)
    expect(idFromTodolists).toStrictEqual(action.todolistID)
})

test("reducer should delete both todolist and tasks array by todolist key",()=>{
    const startTasksState = {
        "ToDoListId1": [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
            {id: "4", title: "Rest API", isDone: false},
            {id: "5", title: "GraphQL", isDone: false},
        ],
        "ToDoListId2": [
            {id: "1", title: "HTML&CSS2", isDone: true},
            {id: "2", title: "JS2", isDone: true},
            {id: "3", title: "ReactJS2", isDone: false},
            {id: "4", title: "Rest API2", isDone: false},
            {id: "5", title: "GraphQL2", isDone: false},
        ]
    }
    const startTodolistsState: ToDoListsType = [
        {id: "ToDoListId1", title: 'What to learn', filter: 'All'},
        {id: "ToDoListId2", title: 'What to buy', filter: 'All'},
    ]
    const action = deleteToDoListAC("ToDoListId1")

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todDoListsReducer(startTodolistsState, action)

    expect(endTodolistsState.length).toBe(1)
    expect(endTasksState["ToDoListId1"]).toBeUndefined()
})