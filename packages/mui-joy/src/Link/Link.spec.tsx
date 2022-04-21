import Link from '@mui/joy/Link';
import * as React from 'react';

<Link />;
<Link component="div" />;

// `variant`
<Link variant="text" />;
<Link variant="light" />;
<Link variant="outlined" />;
<Link variant="contained" />;

// `palette`
<Link palette="primary" />;
<Link palette="danger" />;
<Link palette="info" />;
<Link palette="success" />;
<Link palette="warning" />;
<Link palette="neutral" />;

// `level`
<Link level="h2" />;
<Link level="h3" />;
<Link level="h4" />;
<Link level="h5" />;
<Link level="h6" />;
<Link level="body1" />;
<Link level="body2" />;
<Link level="body3" />;
<Link level="inherit" />;

// `underline`
<Link underline="always" />;
<Link underline="none" />;
<Link underline="hover" />;

// @ts-expect-error there is no variant `filled`
<Link variant="filled" />;

// @ts-expect-error there is no palette `secondary`
<Link palette="secondary" />;

// @ts-expect-error there is no level `h7`
<Link level="h7" />;

// @ts-expect-error there is no level `body4`
<Link level="body4" />;

// @ts-expect-error there is no underline `never`
<Link underline="never" />;
