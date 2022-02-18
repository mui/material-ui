import Paper from '@mui/joy/Paper';
import * as React from 'react';

<Paper />;

<Paper component="div" />;

// `variant`
<Paper variant="text" />;
<Paper variant="light" />;
<Paper variant="outlined" />;
<Paper variant="contained" />;

// `color`
<Paper color="primary" />;
<Paper color="danger" />;
<Paper color="info" />;
<Paper color="success" />;
<Paper color="warning" />;
<Paper color="neutral" />;

// `elevation`
<Paper elevation="xs" />;
<Paper elevation="sm" />;
<Paper elevation="md" />;
<Paper elevation="lg" />;
<Paper elevation="xl" />;

// @ts-expect-error there is no variant `filled`
<Paper variant="filled" />;

// @ts-expect-error there is no color `secondary`
<Paper color="secondary" />;

// @ts-expect-error there is no elevation `xl2`
<Paper elevation="xl2" />;
