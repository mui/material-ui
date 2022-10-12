import Alert from '@mui/joy/Alert';
import * as React from 'react';

<Alert />;

<Alert component="div" />;

// `variant`
<Alert />;
<Alert variant="soft" />;
<Alert variant="outlined" />;
<Alert variant="solid" />;

// `color`
<Alert color="primary" />;
<Alert color="danger" />;
<Alert color="info" />;
<Alert color="success" />;
<Alert color="warning" />;
<Alert color="neutral" />;

// `size`
<Alert size="sm" />;
<Alert size="md" />;
<Alert size="lg" />;

// @ts-expect-error there is no variant `filled`
<Alert variant="filled" />;

// @ts-expect-error there is no color `secondary`
<Alert color="secondary" />;

// @ts-expect-error there is no size `xl2`
<Alert size="xl2" />;
