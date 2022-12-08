import Avatar from '@mui/joy/Avatar';
import * as React from 'react';

<Avatar />;

<Avatar component="div" />;

// `variant`
<Avatar />;
<Avatar variant="soft" />;
<Avatar variant="outlined" />;
<Avatar variant="solid" />;

// `color`
<Avatar color="primary" />;
<Avatar color="danger" />;
<Avatar color="info" />;
<Avatar color="success" />;
<Avatar color="warning" />;
<Avatar color="neutral" />;

// `size`
<Avatar size="sm" />;
<Avatar size="md" />;
<Avatar size="lg" />;

// @ts-expect-error there is no variant `filled`
<Avatar variant="filled" />;

// @ts-expect-error there is no color `secondary`
<Avatar color="secondary" />;

// @ts-expect-error there is no size `xl2`
<Avatar size="xl2" />;
