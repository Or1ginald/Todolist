import React, { ChangeEvent } from 'react';

type InputPropsType = {
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export const Input = React.memo((props: InputPropsType) => (
  <input onChange={props.onChangeHandler} value={props.value} />
));
