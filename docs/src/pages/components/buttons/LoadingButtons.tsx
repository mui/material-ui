import * as React from 'react';
import Box from '@material-ui/core/Box';
import LoadingButton from '@material-ui/lab/LoadingButton';
import SaveIcon from '@material-ui/icons/Save';

export default function LoadingButtons() {
  return (
    <Box
      sx={{
        '& > :not(style)': {
          m: 1,
        },
      }}
    >
      <LoadingButton pending variant="outlined">
        Submit
      </LoadingButton>
      <LoadingButton pending pendingIndicator="Loading..." variant="outlined">
        Fetch data
      </LoadingButton>
      <LoadingButton
        pending
        pendingPosition="start"
        startIcon={<SaveIcon />}
        variant="outlined"
      >
        Save
      </LoadingButton>
    </Box>
  );
}
