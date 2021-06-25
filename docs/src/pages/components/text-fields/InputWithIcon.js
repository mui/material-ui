import * as React from 'react';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default function InputWithIcon() {
  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1 },
      }}
    >
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          With a start adornment
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <TextField
        id="input-with-icon-textfield"
        label="TextField"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="With sx" variant="standard" />
      </Box>
    </Box>
  );
}
