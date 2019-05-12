/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import Link from '@material-ui/core/Link';

export default function ButtonLink() {
  return (
    <Link
      component="button"
      variant="body2"
      onClick={() => {
        alert("I'm a button.");
      }}
    >
      Button Link
    </Link>
  );
}
