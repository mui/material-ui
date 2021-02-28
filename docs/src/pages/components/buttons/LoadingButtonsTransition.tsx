import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import LoadingButton from '@material-ui/lab/LoadingButton';
import Box from '@material-ui/core/Box';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import SaveIcon from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';

const FormControlLabel = styled(MuiFormControlLabel)(`
  display: block;
`);

export default function LoadingButtonsTransition() {
  const [pending, setPending] = React.useState(false);
  function handleClick() {
    setPending(true);
  }

  return (
    <Box
      sx={{
        '& > button': {
          m: 1,
        },
      }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={pending}
            onChange={() => setPending(!pending)}
            name="pending"
            color="primary"
          />
        }
        label="Pending"
      />
      <LoadingButton onClick={handleClick} pending={pending} variant="outlined">
        Submit
      </LoadingButton>
      <LoadingButton
        onClick={handleClick}
        pending={pending}
        pendingIndicator="Loading..."
        variant="outlined"
      >
        Fetch data
      </LoadingButton>
      <LoadingButton
        onClick={handleClick}
        endIcon={<SendIcon />}
        pending={pending}
        pendingPosition="end"
        variant="contained"
      >
        Send
      </LoadingButton>
      <LoadingButton
        color="secondary"
        onClick={handleClick}
        pending={pending}
        pendingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
      >
        Save
      </LoadingButton>
    </Box>
  );
}
