import React from 'react';


type ButtonPropsType = {
    title: string
    callBack: ()=>void
}
export const MyButton = React.memo((props:ButtonPropsType) => {
    console.log("Button was rendered")
    return (
        <button onClick={props.callBack}>{props.title}</button>
    );
});

