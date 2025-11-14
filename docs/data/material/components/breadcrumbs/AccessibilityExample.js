import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export default function AccessibilityExample() {
  return (
    <nav aria-label="breadcrumb">
      <Breadcrumbs aria-label="breadcrumb navigation">
        <Link
          underline="hover"
          color="inherit"
          href="/"
          aria-label="Go to home page"
        >
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/products"
          aria-label="Go to products page"
        >
          Products
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/products/electronics"
          aria-label="Go to electronics category"
        >
          Electronics
        </Link>
        <Typography
          sx={{ color: 'text.primary' }}
          aria-current="page"
        >
          Laptops
        </Typography>
      </Breadcrumbs>
    </nav>
  );
}
