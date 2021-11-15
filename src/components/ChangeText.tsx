import React, {ChangeEvent, useState} from 'react';

type ChangeTextPropsType = {
    title: string
    callBack: (title: string) => void
}

export const ChangeText = React.memo((props: ChangeTextPropsType) => {
    let {title, callBack} = props
    const [isEditable, setIsEditable] = useState(false)
    const [inputVal, setInputVal] = useState("")
    const EnableEditableStatus = () => {
        setIsEditable(true)
        setInputVal(title)
    }
    const DisableEditableStatus = () => {
        setIsEditable(false)
        callBack(inputVal)
    }
    const editTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setInputVal(e.currentTarget.value)
    }
    return (
        isEditable
            ? <input value={inputVal} onChange={editTitle} onBlur={DisableEditableStatus} autoFocus={true}/>
            : <span onDoubleClick={EnableEditableStatus}>{title}</span>
    );
});
