import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography, { TypographyProps } from '@mui/material/Typography';

const variants = [
  'h1',
  'h3',
  'body1',
  'caption',
] as readonly TypographyProps['variant'][];

export default function SkeletonTextWithCustomRadius() {
  return (
    <Stack spacing={1}>
      {variants.map((variant) => (
        <Typography component="div" key={variant} variant={variant}>
          <Skeleton variant="text" sx={{ borderRadius: 1 }} />
        </Typography>
      ))}
    </Stack>
  );
}
