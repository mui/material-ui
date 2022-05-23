import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function ChildElementStyle() {
  return (
    <ButtonGroup variant="contained">
      <style />
      <Button href="#">Send2</Button>
      <Button>Send4</Button>
      <Button>Send3</Button>
      <Button href="#">Send3</Button>
    </ButtonGroup>
  );
}
