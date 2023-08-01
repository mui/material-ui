import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Skeleton from '@mui/joy/Skeleton';
import Stack from '@mui/joy/Stack';
import Switch from '@mui/joy/Switch';

export default function AvatarSkeleton() {
  const [loading, setLoading] = React.useState(true);
  return (
    <Stack spacing={2} useFlexGap sx={{ width: 200, height: 100 }}>
      <Box sx={{ m: 'auto' }}>
        <Avatar src={loading ? '' : '/static/images/avatar/1.jpg'}>
          <Skeleton loading={loading} />
        </Avatar>
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
