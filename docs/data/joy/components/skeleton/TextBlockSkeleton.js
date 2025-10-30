import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';

export default function TextBlockSkeleton() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '100px 260px', gap: 1 }}>
      <Skeleton variant="text" level="h1" />
      <Typography level="h1">h1 Typeface</Typography>

      <Skeleton variant="text" level="h2" />
      <Typography level="h2">h2 Typeface</Typography>

      <Skeleton variant="text" />
      <Typography>body-md Typeface</Typography>

      <Skeleton variant="text" level="body-sm" />
      <Typography level="body-sm">body-sm Typeface</Typography>

      <Skeleton variant="text" level="body-xs" />
      <Typography level="body-xs">body-xs Typeface</Typography>
    </Box>
  );
}
