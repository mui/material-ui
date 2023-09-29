import * as React from 'react';
import PropTypes from 'prop-types';
import { applySolidInversion } from '@mui/joy/colorInversion';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

function Stat({ description, value, sx, ...props }) {
  return (
    <Box
      {...props}
      sx={[
        { borderLeft: 3, borderColor: 'divider', px: 2, py: 0.5 },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography level="h3" component="div">
        {value}
      </Typography>
      <Typography level="title-sm" textColor="text.secondary">
        {description}
      </Typography>
    </Box>
  );
}

Stat.propTypes = {
  description: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
  value: PropTypes.node,
};

export default function ColorInversionAnyParent() {
  return (
    <Box
      sx={[
        {
          display: 'grid',
          gridTemplateColumns: { sm: '1fr 1fr' },
          alignItems: 'center',
          rowGap: 2,
          columnGap: 8,
          p: 2,
          background: (theme) =>
            `linear-gradient(45deg, ${theme.vars.palette.neutral[800]}, ${theme.vars.palette.neutral[600]})`,
          borderRadius: 'sm',
        },
        applySolidInversion('neutral'),
      ]}
    >
      <div>
        <Typography sx={{ my: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </Typography>
        <Button variant="soft" sx={{ mt: 1 }}>
          Learn more
        </Button>
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
        <Stat value="4M" description="Weekly download on NPM" />
        <Stat value="87k" description="Stars on Github" />
        <Stat value="2.7k" description="Open source contributors" />
        <Stat value="18.4k" description="Followers on Twitter" />
      </Box>
    </Box>
  );
}
