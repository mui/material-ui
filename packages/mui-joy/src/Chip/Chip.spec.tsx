import Chip from '@mui/joy/Chip';
import * as React from 'react';

<Chip />;

<Chip component="div" />;

// `variant`
<Chip />;
<Chip variant="soft" />;
<Chip variant="outlined" />;
<Chip variant="solid" />;

// `color`
<Chip color="primary" />;
<Chip color="danger" />;
<Chip color="info" />;
<Chip color="success" />;
<Chip color="warning" />;
<Chip color="neutral" />;

// `size`
<Chip size="sm" />;
<Chip size="md" />;
<Chip size="lg" />;

// @ts-expect-error there is no variant `filled`
<Chip variant="filled" />;

// @ts-expect-error there is no color `secondary`
<Chip color="secondary" />;

// @ts-expect-error there is no size `xl2`
<Chip size="xl2" />;
