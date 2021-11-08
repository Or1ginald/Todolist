import Button from '@mui/material/Button';
import React from 'react';


type ButtonPropsType = {
    title: string
    callBack: () => void
}
export const MyButton = React.memo((props: ButtonPropsType) => {
    console.log("Button was rendered")
    return (
        // <button onClick={props.callBack}>{props.title}</button>
        <Button variant="contained" onClick={props.callBack} size={"medium"}>{props.title}</Button>
    );
});

