import React, { ChangeEvent, useState } from 'react';
/* eslint-disable jsx-a11y/no-autofocus */

type ChangeTextPropsType = {
  title: string;
  callBack: (title: string) => void;
};

export const ChangeText = React.memo((props: ChangeTextPropsType) => {
  const { title, callBack } = props;
  const [isEditable, setIsEditable] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const EnableEditableStatus = (): void => {
    setIsEditable(true);
    setInputVal(title);
  };
  const DisableEditableStatus = (): void => {
    setIsEditable(false);
    callBack(inputVal);
  };
  const editTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputVal(e.currentTarget.value);
  };
  return isEditable ? (
    <input
      value={inputVal}
      onChange={editTitle}
      onBlur={DisableEditableStatus}
      autoFocus
    />
  ) : (
    <span onDoubleClick={EnableEditableStatus}>{title}</span>
  );
});
