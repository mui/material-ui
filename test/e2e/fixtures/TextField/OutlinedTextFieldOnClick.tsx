import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function OutlinedTextFieldOnClick() {
  const [isClicked, setIsClicked] = React.useState(false);
  return (
    <TextField
      id="outlined-basic"
      label="Outlined"
      error={isClicked}
      variant="outlined"
      onClick={() => {
        setIsClicked(true);
      }}
    />
  );
}
