import * as React from 'react';
import Skeleton from '@mui/joy/Skeleton';

<Skeleton variant="circular" />;
<Skeleton variant="inline" />;
<Skeleton variant="overlay" />;
<Skeleton variant="rectangular" />;
<Skeleton variant="text" />;
// @ts-expect-error
<Skeleton variant="unknown" />;

<Skeleton loading />;
<Skeleton loading={false} />;

<Skeleton animation={false} />;
<Skeleton animation="pulse" />;
<Skeleton animation="wave" />;
// @ts-expect-error
<Skeleton animation="unknown" />;
