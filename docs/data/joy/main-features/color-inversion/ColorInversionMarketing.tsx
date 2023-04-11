import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

/**
 * Credit: https://flutter.dev/
 */
export default function ColorInversionMarketing() {
  const [color, setColor] = React.useState<ColorPaletteProp>('primary');
  return (
    <Sheet
      variant="solid"
      color={color}
      invertedColors
      sx={{
        flexGrow: 1,
        display: 'flex',
        bgcolor: color === 'primary' ? '#042449' : undefined,
        p: { xs: '36px', md: '70px' },
        pt: { xs: '24px', md: '60px' },
        borderRadius: '40px',
        overflow: 'hidden',
        '& button': { borderRadius: 'xl' },
      }}
    >
      <Box sx={{ zIndex: 1, position: 'relative' }}>
        <Typography level="display2">Get started</Typography>
        <Typography sx={{ mt: 1, mb: 3 }}>
          Instant access to the power of the React UI library
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            maxWidth: 'max-content',
            '& > *': { flexGrow: 1, fontWeight: 'lg' },
          }}
        >
          <Button sx={{ minWidth: 120 }}>Install</Button>
          <Button
            variant="plain"
            endDecorator={<ArrowForwardIcon fontSize="md" />}
            sx={{
              '&:hover': { '--Button-gap': '0.75rem' },
              '& span': { transition: '0.3s' },
            }}
          >
            See the docs
          </Button>
        </Box>
      </Box>
      <Box
        component="img"
        alt=""
        src="https://storage.googleapis.com/cms-storage-bucket/72521e62275b24d3c37d.png"
        sx={{ position: 'absolute', height: '100%', top: 0, right: 0 }}
      />
      <IconButton
        sx={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '1.5rem',
          borderRadius: '50%',
        }}
        onClick={() => {
          const colors: ColorPaletteProp[] = [
            'primary',
            'neutral',
            'danger',
            'info',
            'success',
            'warning',
          ];
          const nextColor = colors.indexOf(color);
          setColor(colors[nextColor + 1] ?? colors[0]);
        }}
      >
        🎨
      </IconButton>
    </Sheet>
  );
}
