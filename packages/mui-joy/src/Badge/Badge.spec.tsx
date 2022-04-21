import Badge from '@mui/joy/Badge';
import * as React from 'react';

<Badge />;

<Badge component="div" />;

// `variant`
<Badge variant="light" />;
<Badge variant="outlined" />;
<Badge variant="contained" />;

// `palette`
<Badge palette="primary" />;
<Badge palette="danger" />;
<Badge palette="info" />;
<Badge palette="success" />;
<Badge palette="warning" />;
<Badge palette="neutral" />;

// @ts-expect-error there is no variant `filled`
<Badge variant="filled" />;

// @ts-expect-error there is no palette `secondary`
<Badge palette="secondary" />;

// @ts-expect-error there is no elevation `xl2`
<Badge elevation="xl2" />;
