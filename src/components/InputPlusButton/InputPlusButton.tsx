import Button from '@mui/material/Button';
import React, {ChangeEvent, useCallback, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import {TextField} from "@mui/material";

import s from "./InputPlusButton.module.css"

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
            {/*<Input onChangeHandler={inpOnChangeHandler} value={inputVal}/>*/}
            <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={inpOnChangeHandler}
                       value={inputVal} size={"small"} className={s.input}/>
            <Button variant="contained" onClick={addTaskHandler} className={s.button}><AddIcon/></Button>
        </div>
    );
});
