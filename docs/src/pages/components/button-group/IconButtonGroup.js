import * as React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SaveIcon from '@material-ui/icons/Save';

export default function IconButtonGroup() {
  return (
    <ButtonGroup aria-label="icon button group">
      <Button>Save as</Button>
      <Button size="small" aria-label="save">
        <SaveIcon fontSize="small" />
      </Button>
    </ButtonGroup>
  );
}
