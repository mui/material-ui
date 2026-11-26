import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const animations = ['pulse', 'wave', false];
const variants = ['text', 'circular', 'rectangular', 'rounded'];

export default function SkeletonA11yAnimationMatrix() {
  return (
    <Box sx={{ color: 'text.primary', display: 'grid', gap: 2, width: 300 }}>
      {animations.map((animation) => (
        <Stack key={String(animation)} spacing={1}>
          {variants.map((variant) => (
            <Skeleton
              key={variant}
              animation={animation}
              variant={variant}
              width={variant === 'text' ? '100%' : 120}
              height={variant === 'text' ? undefined : 40}
            />
          ))}
        </Stack>
      ))}
    </Box>
  );
}
