/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function CollapsedBreadcrumbs() {
  return (
    <Breadcrumbs maxItems={2} aria-label="breadcrumb">
      <Link color="inherit" href="#" onClick={handleClick}>
        Home
      </Link>
      <Link color="inherit" href="#" onClick={handleClick}>
        Catalog
      </Link>
      <Link color="inherit" href="#" onClick={handleClick}>
        Accessories
      </Link>
      <Link color="inherit" href="#" onClick={handleClick}>
        New Collection
      </Link>
      <Typography color="textPrimary">Belts</Typography>
    </Breadcrumbs>
  );
}
