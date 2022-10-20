import * as React from 'react';
import Button from '@mui/material-next/Button';
import Icon from '@mui/material/Icon';
import SendIcon from '@mui/icons-material/Send';
import { extendTheme } from '@mui/material-next/styles';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

const theme = extendTheme();

export default function IconLabelButtonsNext() {
  return (
    <CssVarsProvider theme={theme}>
      <div>
        <Button variant="filled" color="secondary" startIcon={<SendIcon />}>
          Send
        </Button>
        <Button variant="filled" endIcon={<Icon>send</Icon>}>
          Send
        </Button>
        <Button variant="filled" disabled color="secondary" startIcon={<SendIcon />}>
          Send
        </Button>
        <Button variant="filled" size="small" startIcon={<SendIcon />}>
          Send
        </Button>
        <Button variant="filled" size="large" startIcon={<SendIcon />}>
          Send
        </Button>
      </div>
    </CssVarsProvider>
  );
}
