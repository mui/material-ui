import * as React from 'react';
import Sheet from '@mui/joy/Sheet';

<Sheet />;

<Sheet component="div" />;

// `variant`
<Sheet variant="plain" />;
<Sheet variant="soft" />;
<Sheet variant="outlined" />;
<Sheet variant="solid" />;

// `color`
<Sheet color="primary" />;
<Sheet color="danger" />;
<Sheet color="success" />;
<Sheet color="warning" />;
<Sheet color="neutral" />;

// @ts-expect-error there is no variant `filled`
<Sheet variant="filled" />;

// @ts-expect-error there is no color `secondary`
<Sheet color="secondary" />;
