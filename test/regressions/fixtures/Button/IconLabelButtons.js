import * as React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SendIcon from '@material-ui/icons/Send';

export default function IconLabelButtons() {
  return (
    <div>
      <Button variant="contained" color="secondary" startIcon={<SendIcon />}>
        Send
      </Button>
      <Button variant="contained" endIcon={<Icon>send</Icon>}>
        Send
      </Button>
      <Button variant="contained" disabled color="secondary" startIcon={<SendIcon />}>
        Send
      </Button>
      <Button variant="contained" size="small" startIcon={<SendIcon />}>
        Send
      </Button>
      <Button variant="contained" size="large" startIcon={<SendIcon />}>
        Send
      </Button>
    </div>
  );
}
