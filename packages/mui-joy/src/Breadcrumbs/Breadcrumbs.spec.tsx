import Breadcrumbs from '@mui/joy/Breadcrumbs';
import * as React from 'react';

<Breadcrumbs />;

<Breadcrumbs component="div" />;

// `size`
<Breadcrumbs size="sm" />;
<Breadcrumbs size="md" />;
<Breadcrumbs size="lg" />;

// @ts-expect-error there is no size `xs`
<Breadcrumbs size="xs" />;
// @ts-expect-error there is no size `xl`
<Breadcrumbs size="xl" />;
