/* eslint-disable jsx-a11y/anchor-is-valid, no-alert */

import React from 'react';
import Link from '@material-ui/core/Link';

export default function ButtonLink() {
  return (
    <Link
      component="button"
      onClick={() => {
        alert("I'm a button.");
      }}
    >
      Button Link
    </Link>
  );
}
