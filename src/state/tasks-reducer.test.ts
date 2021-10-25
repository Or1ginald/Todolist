import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, tasksReducer} from "./tasks-reducer";
import {addToDoListAC} from "./todolists-reducer";

let ToDoListId1 = v1()
let ToDoListId2 = v1()

const startState = {
    [ToDoListId1]: [
        {id: "1", title: "HTML&CSS", isDone: true},
        {id: "2", title: "JS", isDone: true},
        {id: "3", title: "ReactJS", isDone: false},
        {id: "4", title: "Rest API", isDone: false},
        {id: "5", title: "GraphQL", isDone: false},
    ],
    [ToDoListId2]: [
        {id: "1", title: "HTML&CSS2", isDone: true},
        {id: "2", title: "JS2", isDone: true},
        {id: "3", title: "ReactJS2", isDone: false},
        {id: "4", title: "Rest API2", isDone: false},
        {id: "5", title: "GraphQL2", isDone: false},
    ]
}

test("reducer should delete task", () => {
    let deletedTaskID = "2"
    let endState = tasksReducer({...startState}, deleteTaskAC(ToDoListId1, deletedTaskID))
    expect(endState[ToDoListId1].length).toBe(4)
    expect(endState[ToDoListId2].length).toBe(5)
    expect(endState[ToDoListId1].every(e => e.id !== deletedTaskID)).toBeTruthy()
})
test("reducer should change task title", () => {
    let endState = tasksReducer({...startState}, changeTaskTitleAC(ToDoListId1, "2", "New Title"))
    expect(endState[ToDoListId1].length).toBe(5)
    expect(endState[ToDoListId2].length).toBe(5)
    expect(endState[ToDoListId1][1].title).toBe("New Title")
    expect(endState[ToDoListId2][1].title).toBe("JS2")
})
test("reducer should add task", () => {
    let endState = tasksReducer({...startState}, addTaskAC(ToDoListId2, "New Task Title"))
    expect(endState[ToDoListId1].length).toBe(5)
    expect(endState[ToDoListId2].length).toBe(6)
    expect(endState[ToDoListId2][0].title).toBe("New Task Title")
})
test("reducer should change task status", () => {
    let endState = tasksReducer({...startState}, changeTaskStatusAC(ToDoListId1, "2", false))
    expect(endState[ToDoListId1].length).toBe(5)
    expect(endState[ToDoListId2].length).toBe(5)
    expect(endState[ToDoListId1][1].isDone).toBe(false)
    expect(endState[ToDoListId2][1].isDone).toBe(true)
})
test("reducer should add empty array property to todolist", () => {
    const endState = tasksReducer({...startState}, addToDoListAC("Doesn't matter"))
    let keys = Object.keys(endState)
    const newTodolistID = keys.find(e => e !== ToDoListId1 && e !== ToDoListId2)
    if (!newTodolistID) {
        throw Error("new key should be added")
    }
    expect(keys.length).toBe(3)
    expect(endState[newTodolistID]).toStrictEqual([])
})


