import * as React from 'react';
import AvatarGroup from '@mui/material/AvatarGroup';

<AvatarGroup component="ul" />;
<AvatarGroup variant="circular" />;
<AvatarGroup variant="rounded" />;
<AvatarGroup variant="square" />;

// @ts-expect-error
<AvatarGroup variant="unknown" />;
