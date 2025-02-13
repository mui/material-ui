import * as React from 'react';
import { prepareForSlot } from '@mui/base/utils';
import { Button } from '@mui/base/Button';
import Link from 'next/link';

const LinkSlot = prepareForSlot(Link);

export default function PrepareForSlot() {
  return (
    <Button href="/" slots={{ root: LinkSlot }} prefetch={false}>
      Home
    </Button>
  );
}
