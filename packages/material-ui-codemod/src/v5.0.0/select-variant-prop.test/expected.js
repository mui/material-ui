import * as React from 'react';
import Select from '@material-ui/core/Select';

export default function SelectComponent(props) {
  return (
    <div>
      <Select {...props} variant="standard" />
      <Select />
      <Select variant="standard" />
      <Select variant="filled" />
    </div>
  );
}
