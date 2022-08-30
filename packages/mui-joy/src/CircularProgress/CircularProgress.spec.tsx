import CircularProgress from '@mui/joy/CircularProgress';
import * as React from 'react';

<CircularProgress />;

<CircularProgress component="div" />;

// `variant`
<CircularProgress />;
<CircularProgress variant="soft" />;
<CircularProgress variant="outlined" />;
<CircularProgress variant="solid" />;

// `color`
<CircularProgress color="primary" />;
<CircularProgress color="danger" />;
<CircularProgress color="info" />;
<CircularProgress color="success" />;
<CircularProgress color="warning" />;
<CircularProgress color="neutral" />;

// `size`
<CircularProgress size="sm" />;
<CircularProgress size="md" />;
<CircularProgress size="lg" />;

// @ts-expect-error there is no variant `filled`
<CircularProgress variant="filled" />;

// @ts-expect-error there is no color `secondary`
<CircularProgress color="secondary" />;

// @ts-expect-error there is no size `xl2`
<CircularProgress size="xl2" />;
