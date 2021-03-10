import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const Input = styled('input')({
  display: 'none',
});

export default function UploadButtons() {
  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1 },
      }}
    >
      <Input accept="image/*" id="contained-button-file" multiple type="file" />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
      <Input accept="image/*" id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </Box>
  );
}
