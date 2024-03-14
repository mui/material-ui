import * as React from 'react';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import { useTheme } from '@mui/joy/styles';

/**
 * Design credit: https://flutter.dev/
 */

export default function ColorInversionMarketing() {
  const [color, setColor] = React.useState('primary');
  const [solid, setSolid] = React.useState(true);
  const theme = useTheme();

  const shade = (x) => theme.vars.palette[color][x];
  const color1 = solid ? shade(800) : shade(600);
  const color2 = solid ? shade(600) : shade(200);
  const color3 = shade(900);
  const gradient1 = `${color1}, ${color2} 65%`;
  const gradient2 = `${color1} 65%, ${color3}`;
  const textColor = { color: solid ? shade(50) : shade(700) };

  return (
    <Sheet
      variant={solid ? 'solid' : 'soft'}
      color={color}
      invertedColors={true}
      sx={{
        flexGrow: 1,
        position: 'relative',
        display: 'flex',
        bgcolor: solid ? shade(800) : shade(100),
        px: '2rem',
        py: { xs: '4rem', md: '6rem' },
        borderRadius: 'lg',
        overflow: 'hidden',

        '&::after': {
          content: `""`,
          display: 'block',
          width: '20rem',
          height: '40rem',
          background: `linear-gradient(to top, ${gradient1}, ${gradient2})`,
          position: 'absolute',
          transform: 'rotate(-45deg)',
          top: { xs: '-100%', sm: '-95%', md: '-65%', lg: '-70%' },
          right: { xs: '-30%', sm: '-15%', md: '-5%' },
        },
      }}
    >
      <Box sx={{ zIndex: 1 }}>
        <Typography level="h1" component="h2" sx={textColor}>
          Get started
        </Typography>
        <Typography level="body-md" sx={{ mb: 2, ...textColor }}>
          Instant access to the power of the Joy UI library.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            maxWidth: 'max-content',
            '& button': { flexGrow: 1 },
          }}
        >
          <Button
            sx={{
              borderRadius: 'xl',
              minWidth: '8rem',
              '&:active': { bgcolor: solid ? shade(200) : shade(700) },
            }}
          >
            Install
          </Button>
          <Button
            variant="plain"
            endDecorator={<ArrowForwardIcon fontSize="md" />}
            sx={{
              ...textColor,
              '&:hover': { '--Button-gap': '0.625rem', bgcolor: 'unset' },
              '&:active': { '--Button-gap': '0.875rem' },
              '& span': { transition: '0.15s' },
            }}
          >
            See the docs
          </Button>
        </Box>
      </Box>

      <Sheet
        sx={{
          display: 'flex',
          bgcolor: 'transparent',
          gap: 1,
          zIndex: 1,
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          '& button': { borderRadius: '50%' },
        }}
      >
        <IconButton variant="solid" onClick={() => setSolid((state) => !state)}>
          <InvertColorsIcon fontSize="xl" />
        </IconButton>
        <IconButton
          variant="soft"
          onClick={() => {
            const colors = ['primary', 'neutral', 'danger', 'success', 'warning'];

            const nextColorIndex = colors.indexOf(color) + 1;
            setColor(colors[nextColorIndex] ?? colors[0]);
          }}
        >
          <ColorLensRoundedIcon fontSize="xl" />
        </IconButton>
      </Sheet>
    </Sheet>
  );
}
