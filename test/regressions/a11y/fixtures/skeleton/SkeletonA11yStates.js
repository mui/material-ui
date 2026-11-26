import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function SkeletonA11yStates() {
  return (
    <Stack spacing={4} sx={{ width: 320 }}>
      {/* Loading: the author marks the region busy. Skeleton adds no role or name of its own. */}
      <Box component="section" aria-labelledby="skeleton-a11y-loading" aria-busy="true">
        <Typography id="skeleton-a11y-loading" component="h2" variant="subtitle1">
          Profile (loading)
        </Typography>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '0.75rem' }} width="60%" />
          </Box>
        </Stack>
        <Skeleton variant="rounded" height={60} sx={{ mt: 1 }} />
      </Box>
      {/* Loaded: the same region once the content replaces the placeholders. */}
      <Box component="section" aria-labelledby="skeleton-a11y-loaded" aria-busy="false">
        <Typography id="skeleton-a11y-loaded" component="h2" variant="subtitle1">
          Profile (loaded)
        </Typography>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>TE</Avatar>
          <div>
            <Typography variant="body1">Ted</Typography>
            <Typography variant="caption">Speaker</Typography>
          </div>
        </Stack>
      </Box>
      {/* Wrapping children: the children stay in the DOM but are `visibility: hidden`. */}
      <Box component="section" aria-labelledby="skeleton-a11y-children" aria-busy="true">
        <Typography id="skeleton-a11y-children" component="h2" variant="subtitle1">
          Skeleton with children
        </Typography>
        <Skeleton variant="circular">
          <Avatar sx={{ bgcolor: 'primary.main' }}>TE</Avatar>
        </Skeleton>
        <Skeleton width="100%">
          <Typography>Hidden placeholder text</Typography>
        </Skeleton>
      </Box>
    </Stack>
  );
}
