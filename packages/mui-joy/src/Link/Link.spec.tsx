import * as React from 'react';
import { expectType } from '@mui/types';
import Link, { LinkOwnerState } from '@mui/joy/Link';

<Link />;
<Link component="div" />;

// `variant`
<Link variant="plain" />;
<Link variant="soft" />;
<Link variant="outlined" />;
<Link variant="solid" />;

// `color`
<Link color="primary" />;
<Link color="danger" />;
<Link color="success" />;
<Link color="warning" />;
<Link color="neutral" />;

<Link textColor="neutral.500" />;
<Link textColor="#fff" />; // should support plain string

// `level`
<Link level="h2" />;
<Link level="h3" />;
<Link level="h4" />;
<Link level="title-lg" />;
<Link level="title-md" />;
<Link level="title-sm" />;
<Link level="body-lg" />;
<Link level="body-md" />;
<Link level="body-sm" />;
<Link level="body-xs" />;

// `underline`
<Link underline="always" />;
<Link underline="none" />;
<Link underline="hover" />;

// extend sx
<Link fontWeight="md" my={1} />;

// @ts-expect-error there is no variant `filled`
<Link variant="filled" />;

// @ts-expect-error there is no color `secondary`
<Link color="secondary" />;

// @ts-expect-error there is no level `unknown`
<Link level="unknown" />;

// @ts-expect-error there is no underline `never`
<Link underline="never" />;

<Link
  slots={{
    root: 'div',
    startDecorator: 'div',
    endDecorator: 'div',
  }}
/>;

<Link
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

<Link
  slotProps={{
    root: (ownerState) => {
      expectType<LinkOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    startDecorator: (ownerState) => {
      expectType<LinkOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    endDecorator: (ownerState) => {
      expectType<LinkOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
/>;
