import React from 'react';

import Button from '@mui/material/Button';

type ButtonPropsType = {
  title: string;
  callBack: () => void;
};
export const MyButton = React.memo((props: ButtonPropsType) => (
  <Button variant="contained" onClick={props.callBack} size="medium">
    {props.title}
  </Button>
));
