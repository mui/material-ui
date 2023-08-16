import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Skeleton from '@mui/joy/Skeleton';
import Stack from '@mui/joy/Stack';
import Switch from '@mui/joy/Switch';

export default function AvatarSkeleton() {
  const [loading, setLoading] = React.useState(true);
  return (
    <Stack
      spacing={4}
      useFlexGap
      sx={{ width: 200, height: 100, alignItems: 'center' }}
    >
      <Avatar src={loading ? '' : '/static/images/avatar/1.jpg'}>
        <Skeleton loading={loading} />
      </Avatar>
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
