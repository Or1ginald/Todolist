import {AppReducer, AppReducerInitialStateType, setAppStatusAC, setErrorLogAC, setIsInitializedAC} from "../appReducer";

const initialState: AppReducerInitialStateType = {
    status: "idle",
    errorLog: null,
    isInitialized: false,
}

describe("app reducer", () => {
    it('should return the initial state', () => {
        expect(AppReducer(undefined, setAppStatusAC("idle"))).toStrictEqual(initialState);
    })
    it('should change status property', () => {
        const action = setAppStatusAC("succeeded")
        expect(AppReducer(initialState, action).status).toBe("succeeded");
    })
    it('should change errorLog property', () => {
        expect(AppReducer(initialState, setErrorLogAC("New error")).errorLog)
            .toBe("New error");
        expect(AppReducer(initialState, setErrorLogAC(null)).errorLog).toBe(null);
    })
    it('should change isInitialized property', () => {
        expect(AppReducer(initialState, setIsInitializedAC(true)).isInitialized)
            .toBe(true);
        expect(AppReducer(initialState, setIsInitializedAC(true)).isInitialized).not.toBe(false);
    })

})