import * as React from 'react';
import Button from '@material-ui/core/Button';

function preventDefault(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

export default function ButtonDemo() {
  return (
    <div role="presentation" onClick={preventDefault}>
      <Button href="/" variant="contained">
        Link
      </Button>
    </div>
  );
}
