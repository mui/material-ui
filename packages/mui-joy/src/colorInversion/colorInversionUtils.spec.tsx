import * as React from 'react';
import { styled } from '@mui/joy/styles';
import { applySoftInversion, applySolidInversion } from '@mui/joy/colorInversion';
import Box from '@mui/joy/Box';

/**
 * sx prop type check
 */
<Box sx={[(theme) => ({}), applySoftInversion('neutral'), applySoftInversion('primary')]} />;

<Box
  sx={[
    (theme) => ({}),
    // @ts-expect-error no `unknown` color from theme palette
    applySoftInversion('unknown'),
    // @ts-expect-error no `unknown` color from theme palette
    applySoftInversion('unknown'),
  ]}
/>;

/**
 * styled API type check
 */
styled('div')(({ theme }) => ({}), applySoftInversion('primary'), applySolidInversion('primary'));

styled('div')(
  ({ theme }) => ({}),
  // @ts-expect-error no `unknown` color from theme palette
  applySoftInversion('unknown'),
  // @ts-expect-error no `unknown` color from theme palette
  applySolidInversion('unknown'),
);
