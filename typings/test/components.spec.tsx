import * as React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const log = console.log;

const ButtonTest = () => <Button>I am a button!</Button>;

const TextFieldTest = () =>
  <div>
    <TextField
      id="name"
      label="Name"
      value={'Alice'}
    />
    <TextField
      id="name"
      label={<strong>Name</strong>}
      value={'Alice'}
    />
    <TextField
      id="name"
      label="Name"
      value={'Alice'}
        onChange={(event:React.SyntheticEvent<any>) => log({ name: event.currentTarget.value })}
    />
  </div>