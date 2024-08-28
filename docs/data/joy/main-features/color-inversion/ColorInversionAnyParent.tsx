import * as React from 'react';
import { applySolidInversion } from '@mui/joy/colorInversion';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

function Stat({
  description,
  value,
}: {
  description: React.ReactNode;
  value: React.ReactNode;
}) {
  return (
    <Box sx={{ borderLeft: 3, borderColor: 'divider', px: 2, py: 0.5 }}>
      <Typography level="h3" component="div">
        {value}
      </Typography>
      <Typography level="title-sm" textColor="text.secondary">
        {description}
      </Typography>
    </Box>
  );
}
export default function ColorInversionAnyParent() {
  return (
    <Box
      sx={[
        (theme) => ({
          display: 'grid',
          gridTemplateColumns: { sm: '1fr 1fr' },
          alignItems: 'center',
          rowGap: 2,
          columnGap: 8,
          p: 4,
          borderRadius: 'sm',
          background: `linear-gradient(45deg, ${theme.vars.palette.neutral[800]}, ${theme.vars.palette.neutral[600]})`,
        }),
        applySolidInversion('neutral'),
      ]}
    >
      <div>
        <Typography sx={{ mb: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Button variant="soft">Learn more</Button>
      </div>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(auto-fill, minmax(min(100%, 180px), 1fr))',
            sm: '1fr 1fr',
          },
          gap: 3,
        }}
      >
        <Stat value="4M" description="Weekly downloads" />
        <Stat value="87k" description="Stars on GitHub" />
        <Stat value="2.7k" description="Open source contributors" />
        <Stat value="18.4k" description="Followers on X" />
      </Box>
    </Box>
  );
}
