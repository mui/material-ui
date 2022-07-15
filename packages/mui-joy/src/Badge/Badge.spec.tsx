import Badge from '@mui/joy/Badge';
import * as React from 'react';

<Badge />;

<Badge component="div" />;

// `variant`
<Badge variant="soft" />;
<Badge variant="outlined" />;
<Badge variant="solid" />;

// `color`
<Badge color="primary" />;
<Badge color="danger" />;
<Badge color="info" />;
<Badge color="success" />;
<Badge color="warning" />;
<Badge color="neutral" />;

// @ts-expect-error there is no variant `filled`
<Badge variant="filled" />;

// @ts-expect-error there is no color `secondary`
<Badge color="secondary" />;

// @ts-expect-error there is no elevation `xl2`
<Badge elevation="xl2" />;
