import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function BasicBreadcrumbs() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Material-UI
        </Link>
        <Link color="inherit" href="/getting-started/installation/">
          Core
        </Link>
        <Typography color="text.primary">Breadcrumb</Typography>
      </Breadcrumbs>
    </div>
  );
}
