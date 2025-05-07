import * as React from 'react';
import { expectType } from '@mui/types';
import Typography, { TypographyOwnerState } from '@mui/joy/Typography';

<Typography component="a" href="/">
  Text
</Typography>;

function Link(props: React.JSX.IntrinsicElements['a']) {
  return <a {...props} />;
}
<Typography component={Link} href="/">
  Text
</Typography>;

// @ts-expect-error href is not exist in div
<Typography component="div" href="/">
  Text
</Typography>;

<Typography color="primary" />;
<Typography color="neutral" />;
<Typography color="danger" />;
<Typography color="success" />;
<Typography color="warning" />;

<Typography textColor="neutral.500" />;
<Typography textColor="#fff" />; // should support plain string

<Typography
  slots={{
    root: 'div',
    startDecorator: 'div',
    endDecorator: 'div',
  }}
/>;

<Typography
  slotProps={{
    root: {
      component: 'div',
      'data-testid': 'test',
    },
    startDecorator: {
      component: 'div',
      'data-testid': 'test',
    },
    endDecorator: {
      component: 'div',
      'data-testid': 'test',
    },
  }}
/>;

<Typography
  slotProps={{
    root: (ownerState) => {
      expectType<TypographyOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    startDecorator: (ownerState) => {
      expectType<TypographyOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    endDecorator: (ownerState) => {
      expectType<TypographyOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
/>;
