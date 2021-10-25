import React, {ChangeEvent, useCallback, useState} from 'react';
import {Input} from "./Input";
import {Button} from "./Button";

type InputPropsType = {
    addCallBack: (title: string) => void
}

export const InputPlusButton = React.memo((props: InputPropsType) => {
    console.log("InputPlusButton render")
    const [inputVal, setInpVal] = useState<string>("");
    const addTaskHandler = useCallback(() => {
        props.addCallBack(inputVal)
        setInpVal("")
    }, [inputVal, props])
    const inpOnChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInpVal(e.currentTarget.value)
    }, [])
    return (
        <div>
            {/*<input onChange={inpOnChangeHandler} value={inputVal}/>*/}
            <Input onChangeHandler={inpOnChangeHandler} value={inputVal}/>
            <Button title={"+"} callBack={addTaskHandler}/>
        </div>
    );
});
