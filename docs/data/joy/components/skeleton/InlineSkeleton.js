import * as React from 'react';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Skeleton from '@mui/joy/Skeleton';
import Stack from '@mui/joy/Stack';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';

export default function InlineSkeleton() {
  const [loading, setLoading] = React.useState(true);
  return (
    <Stack spacing={2} useFlexGap sx={{ maxWidth: '60ch' }}>
      <Box sx={{ m: 'auto' }}>
        <Typography
          level="h1"
          sx={{ fontSize: 'xl', position: 'relative', overflow: 'hidden' }}
        >
          <Skeleton loading={loading}>A heading</Skeleton>
        </Typography>
        <Typography
          level="body-xs"
          sx={{ mt: 1, mb: 2, position: 'relative', overflow: 'hidden' }}
        >
          <Skeleton loading={loading}>HISTORY, PURPOSE AND USAGE</Skeleton>
        </Typography>
        <Typography sx={{ position: 'relative', overflow: 'hidden' }}>
          <Skeleton loading={loading}>
            <i>Lorem ipsum</i> is placeholder text commonly used in the graphic,
            print, and publishing industries for previewing layouts and visual
            mockups.
          </Skeleton>
        </Typography>
      </Box>
      <FormControl orientation="horizontal" sx={{ gap: 1 }}>
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
