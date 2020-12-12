import * as React from 'react';
import Link from '@material-ui/core/Link';
import { visuallyHidden } from '@material-ui/utils';
import Box from '@material-ui/core/Box';

export default function VisuallyHiddenUsage() {
  return (
    <Link href="#foo">
      Read more
      {/* always visually hidden because the parent is focusable element */}
      <Box component="span" sx={{ ...visuallyHidden }}>
        about how to visually hide elements
      </Box>
    </Link>
  );
}
