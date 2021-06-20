import * as React from 'react';
import LoadingButton from '@material-ui/lab/LoadingButton';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import SaveIcon from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';

export default function LoadingButtonsTransition() {
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  function handleClick() {
    setLoading(true);
  }

  return (
    <Box sx={{ '& > button': { m: 1 } }}>
      <FormControlLabel
        sx={{
          display: 'block',
        }}
        control={
          <Switch
            checked={loading}
            onChange={() => setLoading(!loading)}
            name="loading"
            color="primary"
          />
        }
        label="Loading"
      />
      <FormControlLabel
        sx={{
          display: 'block',
        }}
        control={
          <Switch
            checked={disabled}
            onChange={() => setDisabled(!disabled)}
            name="disabled"
            color="primary"
          />
        }
        label="Disabled"
      />
      <LoadingButton
        onClick={handleClick}
        loading={loading}
        disabled={disabled}
        variant="outlined"
      >
        Submit
      </LoadingButton>
      <LoadingButton
        onClick={handleClick}
        loading={loading}
        disabled={disabled}
        loadingIndicator="Loading..."
        variant="outlined"
      >
        Fetch data
      </LoadingButton>
      <LoadingButton
        onClick={handleClick}
        endIcon={<SendIcon />}
        loading={loading}
        disabled={disabled}
        loadingPosition="end"
        variant="contained"
      >
        Send
      </LoadingButton>
      <LoadingButton
        color="secondary"
        onClick={handleClick}
        loading={loading}
        disabled={disabled}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
      >
        Save
      </LoadingButton>
    </Box>
  );
}
