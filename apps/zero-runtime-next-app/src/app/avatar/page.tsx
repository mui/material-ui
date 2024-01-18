import Stack from '@mui/material/Stack';
import Avatar from '@/components/Avatar/Avatar';

export default function Avatars() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </Stack>
  );
}
