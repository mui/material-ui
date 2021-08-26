import * as React from 'react';
import InputUnstyled from '@material-ui/unstyled/InputUnstyled';
import { styled } from '@material-ui/system';
import { FormControlUnstyled } from '@material-ui/unstyled';
import { TextareaAutosize } from '@material-ui/core';

const CustomRoot = styled('div')(`
  padding: 10px;
  background-color: #e0e0e0;
`);

export default function UnstyledInput() {
  const components = {
    Root: CustomRoot,
  };

  const [value, setValue] = React.useState('controlled');

  const withDescription = { input: { 'aria-label': 'Demo input' } };

  return (
    <div>
      <p id="lbl1">Demo input</p>
      <InputUnstyled
        required
        autoFocus
        autoComplete="name"
        id="my-input"
        data-testid="this should be on root"
        components={components}
        defaultValue="uncontrolled"
        componentsProps={withDescription}
      />
      <FormControlUnstyled
        defaultValue="uncontrolled with FormControl"
        error
        required
      >
        <InputUnstyled
          components={components}
          componentsProps={withDescription}
          aria-describedby="lbl1"
        />
      </FormControlUnstyled>

      <hr />

      <InputUnstyled
        error
        required
        components={components}
        componentsProps={withDescription}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <FormControlUnstyled
        value={value}
        onChange={(event) => setValue(event.target.value)}
        error
        required
      >
        <InputUnstyled components={components} componentsProps={withDescription} />
      </FormControlUnstyled>

      <hr />

      <InputUnstyled
        multiline
        minRows="3"
        maxRows="5"
        components={{ Root: CustomRoot, Textarea: TextareaAutosize }}
        componentsProps={withDescription}
      />
    </div>
  );
}
