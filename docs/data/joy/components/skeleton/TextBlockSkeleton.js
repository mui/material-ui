import * as React from 'react';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Skeleton from '@mui/joy/Skeleton';
import Stack from '@mui/joy/Stack';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';

export default function TextBlockSkeleton() {
  const [loading, setLoading] = React.useState(true);
  return (
    <Stack spacing={2} useFlexGap>
      <Box sx={{ display: 'grid', gridTemplateColumns: '100px 260px', gap: 1 }}>
        <Skeleton variant="text" level="h1" />
        <Typography level="h1">h1 Typeface</Typography>

        <Skeleton variant="text" level="h2" />
        <Typography level="h2">h2 Typeface</Typography>

        <Skeleton variant="text" level="body1" />
        <Typography level="body1">body1 Typeface</Typography>

        <Skeleton variant="text" level="body2" />
        <Typography level="body2">body2 Typeface</Typography>

        <Skeleton variant="text" level="body3" />
        <Typography level="body3">body3 Typeface</Typography>
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
