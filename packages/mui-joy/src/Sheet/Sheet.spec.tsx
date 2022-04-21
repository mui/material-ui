import Sheet from '@mui/joy/Sheet';
import * as React from 'react';

<Sheet />;

<Sheet component="div" />;

// `variant`
<Sheet variant="text" />;
<Sheet variant="light" />;
<Sheet variant="outlined" />;
<Sheet variant="contained" />;

// `palette`
<Sheet palette="primary" />;
<Sheet palette="danger" />;
<Sheet palette="info" />;
<Sheet palette="success" />;
<Sheet palette="warning" />;
<Sheet palette="neutral" />;

// `elevation`
<Sheet elevation="xs" />;
<Sheet elevation="sm" />;
<Sheet elevation="md" />;
<Sheet elevation="lg" />;
<Sheet elevation="xl" />;

// @ts-expect-error there is no variant `filled`
<Sheet variant="filled" />;

// @ts-expect-error there is no palette `secondary`
<Sheet palette="secondary" />;

// @ts-expect-error there is no elevation `xl2`
<Sheet elevation="xl2" />;
