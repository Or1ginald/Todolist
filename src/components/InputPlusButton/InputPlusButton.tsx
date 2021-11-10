import Button from '@mui/material/Button';
import React, {ChangeEvent, useCallback, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import {TextField} from "@mui/material";
import Box from '@mui/material/Box';

import s from "./InputPlusButton.module.css"
import {Nullable} from "../../Types/Nullable";


type InputPropsType = {
    addCallBack: (title: string) => void
}

export const InputPlusButton = React.memo((props: InputPropsType) => {
    console.log("InputPlusButton render")
    const [inputVal, setInpVal] = useState<string>("");
    const [error, setError] = useState<Nullable<string>>(null)
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
            <Box sx={{
                display: 'flex',
                gap: 1,
                flexWrap: "nowrap",
            }}>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={inpOnChangeHandler}
                       error={!!error}
                       value={inputVal} size={"small"} className={s.input} helperText={error}/>

            <Button variant="contained" onClick={addTaskHandler} className={s.button}><AddIcon/></Button>
            </Box>
        </div>
    );
});
