import * as React from 'react';
import Badge from '@material-ui/core/Badge';
import { ThemeOptions } from '@material-ui/core/styles';

declare module '@material-ui/core/Badge' {
  interface BadgePropsVariantOverrides {
    action: true;
  }
}

export const theme: ThemeOptions = {
  components: {
    MuiBadge: {
      variants: [
        {
          style: {},
          props: { variant: 'action' },
        },
      ],
    },
  },
};

<Badge variant="action" />;
// @ts-expect-error typo
<Badge variant="Action" />;
