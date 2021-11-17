import Button from '@mui/material/Button';
import React, {ChangeEvent, useCallback, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import {TextField} from "@mui/material";
import Box from '@mui/material/Box';

import s from "./InputPlusButton.module.css"
import {Nullable} from "../../Types/Nullable";
import {ErrorSnackBar} from "../ErrorSnackBar";



type InputPropsType = {
    addCallBack: (title: string) => void
    label: string
}

export const InputPlusButton = React.memo((props: InputPropsType) => {
    const {addCallBack, label} = props

    const [inputValue, setInpVal] = useState<string>("");
    const [error, setError] = useState<Nullable<string>>(null)

    const onAddItemButtonClick = useCallback(() => {
        if (inputValue.trim()) {
            setError(null)
            addCallBack(inputValue)
            setInpVal("")
        } else {
            setError("Incorrect input")
        }
    }, [addCallBack, inputValue])

    const onTextInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInpVal(e.currentTarget.value)
    }, [])

    return (
        <div>
            <ErrorSnackBar/>
            <Box sx={{
                display: 'flex',
                gap: 1,
                flexWrap: "nowrap",
            }}>
                <TextField id="outlined-basic" label={label} variant="outlined" onChange={onTextInputChange}
                           error={!!error}
                           value={inputValue} size={"small"} className={s.input} helperText={error}/>

                <Button variant="contained" onClick={onAddItemButtonClick} className={s.button}><AddIcon/></Button>
            </Box>
        </div>
    );
});
