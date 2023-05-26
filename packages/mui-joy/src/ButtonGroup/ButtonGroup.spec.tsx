import ButtonGroup from '@mui/joy/ButtonGroup';
import * as React from 'react';

<ButtonGroup />;

<ButtonGroup component="div" />;

// `variant`
<ButtonGroup variant="plain" />;
<ButtonGroup variant="soft" />;
<ButtonGroup variant="outlined" />;
<ButtonGroup variant="solid" />;

// `color`
<ButtonGroup color="primary" />;
<ButtonGroup color="danger" />;
<ButtonGroup color="info" />;
<ButtonGroup color="success" />;
<ButtonGroup color="warning" />;
<ButtonGroup color="neutral" />;

// @ts-expect-error there is no variant `filled`
<ButtonGroup variant="filled" />;

// @ts-expect-error there is no color `secondary`
<ButtonGroup color="secondary" />;
