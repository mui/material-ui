import * as React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function ActiveLastBreadcrumb() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Material-UI
        </Link>
        <Link color="inherit" href="/getting-started/installation/">
          Core
        </Link>
        <Link
          color="text.primary"
          href="/components/breadcrumbs/"
          aria-current="page"
        >
          Breadcrumb
        </Link>
      </Breadcrumbs>
    </div>
  );
}
