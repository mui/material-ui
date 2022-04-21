import Chip from '@mui/joy/Chip';
import * as React from 'react';

<Chip />;

<Chip component="div" />;

// `variant`
<Chip />;
<Chip variant="light" />;
<Chip variant="outlined" />;
<Chip variant="contained" />;

// `palette`
<Chip palette="primary" />;
<Chip palette="danger" />;
<Chip palette="info" />;
<Chip palette="success" />;
<Chip palette="warning" />;
<Chip palette="neutral" />;

// `size`
<Chip size="sm" />;
<Chip size="md" />;
<Chip size="lg" />;

// @ts-expect-error there is no variant `filled`
<Chip variant="filled" />;

// @ts-expect-error there is no palette `secondary`
<Chip palette="secondary" />;

// @ts-expect-error there is no size `xl2`
<Chip size="xl2" />;
