import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';

export default function BaselineAlignTextField() {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'baseline',
        }}
      >
        Base
        <TextField
          label="label"
          placeholder="placeholder"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Visibility />
              </InputAdornment>
            ),
          }}
        />
        Base
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'baseline',
        }}
      >
        Base
        <TextField
          label="label"
          placeholder="placeholder"
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Visibility />
              </InputAdornment>
            ),
          }}
        />
        Base
      </div>
    </div>
  );
}
