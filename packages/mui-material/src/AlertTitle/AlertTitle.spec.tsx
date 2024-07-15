import * as React from 'react';
import AlertTitle from '@mui/material/AlertTitle';

<AlertTitle variant="h4" />;

<AlertTitle sx={{ typography: { xs: 'body1', sm: 'h2', md: 'h1', lg: 'body2' } }} />
{/* @ts-expect-error */}
<AlertTitle sx={{ typography: { xs: 'body 1', sm: 'h2', md: 'h1', lg: 'body1' } }} />
