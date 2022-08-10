import * as React from 'react';
import { SxProps } from '@mui/system';

interface Theme {
  color: string;
}

const Text = (props: { sx?: SxProps<Theme> }) => null;

// object
<Text sx={{ color: '#121212' }} />;

// function
<Text sx={(theme) => ({ color: theme.color })} />;

// array
<Text sx={[(theme) => ({ color: theme.color }), { m: 2 }]} />;

// null
<Text sx={{ m: null, transform: null, typography: undefined }} />;

// array contains boolean
<Text sx={[false && { p: 2 }, { m: 2 }]} />;

// @ts-expect-error invalid property 'lm'
<Text sx={{ mt: 1, lm: 2 }} />;
