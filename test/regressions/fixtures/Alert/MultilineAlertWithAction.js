import * as React from 'react';
import Button from '@material-ui/core/Button';
import Typogrpahy from '@material-ui/core/Typography';
import Alert from '@material-ui/core/Alert';

export default function MultilineAlertWithAction() {
  return (
    <Alert
      action={
        <Button color="inherit" size="small">
          UNDO
        </Button>
      }
    >
      <Typogrpahy as="div">This is the first line.</Typogrpahy>
      <Typogrpahy as="div">This is the second line.</Typogrpahy>
    </Alert>
  );
}
