import * as React from 'react';
import Link from '@mui/material-nextjs/v13-Link';

// @ts-expect-error href is required by Next.js
<Link />;
<Link href="" />;
<Link
  href={{
    pathname: '/about',
    query: { name: 'test' },
  }}
/>;
<Link href="/dashboard" replace>
  Dashboard
</Link>;
<Link href="/dashboard" scroll={false}>
  Dashboard
</Link>;
<Link href="/dashboard" prefetch={false}>
  Dashboard
</Link>;

<Link href="" sx={{ color: 'secondary.dark' }} />;
<Link href="" variant="caption" />;
<Link href="" underline="always" />;
