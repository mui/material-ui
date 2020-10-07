import * as React from 'react';
import { palette } from '@material-ui/system';

export default function MaterialUISystemColors() {
  const result = palette({
    theme: {},
    bgcolor: ['red', 'blue'],
  });

  return null;
}
