import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Skeleton from '@mui/joy/Skeleton';
import Stack from '@mui/joy/Stack';
import Switch from '@mui/joy/Switch';

export default function ImageSkeleton() {
  const [loading, setLoading] = React.useState(true);
  return (
    <Stack spacing={2} useFlexGap>
      <Box sx={{ m: 'auto' }}>
        <AspectRatio sx={{ width: 300 }}>
          <Skeleton loading={loading}>
            <img
              src="https://images.unsplash.com/photo-1686548812883-9d3777f4c137"
              alt=""
            />
          </Skeleton>
        </AspectRatio>
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
