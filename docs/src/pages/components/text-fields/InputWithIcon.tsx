import * as React from 'react';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default function InputWithIcon() {
  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1 },
      }}
    >
      <FormControl>
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
      <div>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle sx={{ color: 'action.active' }} />
          </Grid>
          <Grid item>
            <TextField
              id="input-with-icon-grid"
              label="With a grid"
              variant="standard"
            />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
