import * as React from 'react';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function SkeletonA11yLoading() {
  const [loading, setLoading] = React.useState(true);
  return (
    <Stack spacing={2}>
      <Button onClick={() => setLoading((value) => !value)}>Toggle loading</Button>
      <section aria-label="Article" aria-busy={loading}>
        {loading ? (
          <Stack spacing={1} aria-hidden="true">
            <Skeleton animation="pulse" />
            <Skeleton variant="rounded" animation="wave" height={80} />
            <Skeleton animation={false} />
          </Stack>
        ) : (
          <p>The article has loaded.</p>
        )}
      </section>
    </Stack>
  );
}
