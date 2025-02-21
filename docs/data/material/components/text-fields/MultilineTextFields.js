import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields() {
  const handlePaste = (event) => {
    event.preventDefault();

    const text = event.clipboardData.getData('text');
    const target = event.target;

    if (!target || typeof target.selectionStart !== 'number') return;

    const { selectionStart, selectionEnd, value } = target;

    const newValue =
      value.slice(0, selectionStart) + text + value.slice(selectionEnd);
    target.value = newValue;

    target.setSelectionRange(
      selectionStart + text.length,
      selectionStart + text.length,
    );
  };

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
          onPaste={handlePaste}
        />
        <TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          onPaste={handlePaste}
        />
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
          onPaste={handlePaste}
        />
      </div>
      <div>
        <TextField
          id="filled-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
          variant="filled"
          onPaste={handlePaste}
        />
        <TextField
          id="filled-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="filled"
          onPaste={handlePaste}
        />
        <TextField
          id="filled-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="filled"
          onPaste={handlePaste}
        />
      </div>
      <div>
        <TextField
          id="standard-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
          variant="standard"
          onPaste={handlePaste}
        />
        <TextField
          id="standard-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="standard"
          onPaste={handlePaste}
        />
        <TextField
          id="standard-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="standard"
          onPaste={handlePaste}
        />
      </div>
    </Box>
  );
}
