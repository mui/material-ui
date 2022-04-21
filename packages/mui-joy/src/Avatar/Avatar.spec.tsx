import Avatar from '@mui/joy/Avatar';
import * as React from 'react';

<Avatar />;

<Avatar component="div" />;

// `variant`
<Avatar />;
<Avatar variant="light" />;
<Avatar variant="outlined" />;
<Avatar variant="contained" />;

// `palette`
<Avatar palette="primary" />;
<Avatar palette="danger" />;
<Avatar palette="info" />;
<Avatar palette="success" />;
<Avatar palette="warning" />;
<Avatar palette="neutral" />;

// `size`
<Avatar size="sm" />;
<Avatar size="md" />;
<Avatar size="lg" />;

// @ts-expect-error there is no variant `filled`
<Avatar variant="filled" />;

// @ts-expect-error there is no palette `secondary`
<Avatar palette="secondary" />;

// @ts-expect-error there is no size `xl2`
<Avatar size="xl2" />;
