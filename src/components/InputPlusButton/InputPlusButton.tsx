import Button from '@mui/material/Button';
import React, {ChangeEvent, useCallback, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import {TextField} from "@mui/material";
import Box from '@mui/material/Box';

import s from "./InputPlusButton.module.css"
import {Nullable} from "../../Types/Nullable";


type InputPropsType = {
    addCallBack: (title: string) => void
    label: string
}

export const InputPlusButton = React.memo((props: InputPropsType) => {
    const {addCallBack, label} = props
    console.log("InputPlusButton render")
    const [inputVal, setInpVal] = useState<string>("");
    const [error, setError] = useState<Nullable<string>>(null)
    const addTaskHandler = useCallback(() => {
        if (inputVal.trim()) {
            setError(null)
            addCallBack(inputVal)
            setInpVal("")
        } else {
            setError("Incorrect input")
        }
    }, [inputVal, props])
    const inpOnChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInpVal(e.currentTarget.value)
    }, [])

    return (
        <div>
            <Box sx={{
                display: 'flex',
                gap: 1,
                flexWrap: "nowrap",
            }}>
                <TextField id="outlined-basic" label={label} variant="outlined" onChange={inpOnChangeHandler}
                           error={!!error}
                           value={inputVal} size={"small"} className={s.input} helperText={error}/>

                <Button variant="contained" onClick={addTaskHandler} className={s.button}><AddIcon/></Button>
            </Box>
        </div>
    );
});
