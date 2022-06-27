import Link from '@mui/joy/Link';
import * as React from 'react';

<Link />;
<Link component="div" />;

// `variant`
<Link variant="plain" />;
<Link variant="soft" />;
<Link variant="outlined" />;
<Link variant="solid" />;

// `color`
<Link color="primary" />;
<Link color="danger" />;
<Link color="info" />;
<Link color="success" />;
<Link color="warning" />;
<Link color="neutral" />;

<Link textColor="neutral.500" />;

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

// extend sx
<Link fontWeight="md" my={1} />;

// @ts-expect-error there is no variant `filled`
<Link variant="filled" />;

// @ts-expect-error there is no color `secondary`
<Link color="secondary" />;

// @ts-expect-error there is no level `unknown`
<Link level="unknown" />;

// @ts-expect-error there is no underline `never`
<Link underline="never" />;
