import * as React from 'react';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Skeleton from '@mui/joy/Skeleton';
import Stack from '@mui/joy/Stack';
import Switch from '@mui/joy/Switch';

export default function GeometrySkeleton() {
  const [loading, setLoading] = React.useState(true);
  return (
    <Stack spacing={2} useFlexGap>
      <Box sx={{ m: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
        <Skeleton loading={loading} variant="circular" width={48} height={48} />
        <Box>
          <Skeleton
            loading={loading}
            variant="rectangular"
            width={200}
            sx={{ mb: 1 }}
          />
          <Skeleton loading={loading} variant="rectangular" width={140} />
        </Box>
      </Box>
      <FormControl
        orientation="horizontal"
        sx={{ gap: 1, justifyContent: 'center' }}
      >
        <Switch
          size="sm"
          checked={loading}
          onChange={(event) => setLoading(event.target.checked)}
        />
        <FormLabel>Loading</FormLabel>
      </FormControl>
    </Stack>
  );
}
