import * as React from 'react';
import { mui } from '@material-ui/core/primitives';

export default function Page() {
  return (
    <mui.div
      typography="body2"
      p={2}
      color="error.main"
      borderRadius={4}
      sx={{ bgcolor: 'grey.300' }}
    >
      Hello test
      <mui.a href="#" ml={2} className="test">
        Hello
      </mui.a>
    </mui.div>
  );
}
