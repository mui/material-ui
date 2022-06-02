import * as React from 'react';
import Head from 'next/head';
import { GlobalStyles } from '@mui/system';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { HeartIcon } from '@heroicons/react/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart';
import { AiOutlineHeart } from 'react-icons/ai';
import { HeartIcon as OcticonHeart } from '@primer/octicons-react';
import { Heart } from 'react-feather';

const ColorSchemePicker = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      sx={{ minWidth: 40, p: '0.25rem' }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

export default function JoyTypography() {
  return (
    <CssVarsProvider>
      <Head>
        <script
          type="module"
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
        />
        <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css"
        />
      </Head>
      <GlobalStyles
        styles={{
          'ion-icon, .bi, .heroicon, .octicon, svg:not([class]), .svg-inline--fa': {
            color: 'var(--Icon-color)',
            margin: 'var(--Icon-margin)',
            fontSize: 'var(--Icon-fontSize, 20px)',
          },
          '.heroicon, .octicon, svg[width][height]': {
            width: '1em',
            height: '1em',
          },
        }}
      />
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <ColorSchemePicker />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
            py: 4,
            justifyItems: 'flex-start',
            '& > .JoyTypography-body1': { color: 'primary.plainColor' },
          }}
        >
          <Typography level="body3" letterSpacing="md" textTransform="uppercase" fontWeight="lg">
            Material UI
          </Typography>
          <Typography level="body3" letterSpacing="md" textTransform="uppercase" fontWeight="lg">
            Ionicon
          </Typography>
          <Typography level="body3" letterSpacing="md" textTransform="uppercase" fontWeight="lg">
            Heroicon
          </Typography>
          <Typography level="body3" letterSpacing="md" textTransform="uppercase" fontWeight="lg">
            Bootstrap
          </Typography>

          <Typography startDecorator={<FavoriteBorder />}>My favorite</Typography>
          {/* @ts-ignore */}
          <Typography startDecorator={<ion-icon name="heart-outline" />}>My favorite</Typography>
          <Typography startDecorator={<HeartIcon className="heroicon" />}>My favorite</Typography>
          <Typography startDecorator={<i className="bi bi-heart" />}>My favorite</Typography>

          <Button startIcon={<FavoriteBorder />}>My favorite</Button>
          {/* @ts-ignore */}
          <Button startIcon={<ion-icon name="heart-outline" />}>My favorite</Button>
          <Button startIcon={<HeartIcon className="heroicon" />}>My favorite</Button>
          <Button startIcon={<i className="bi bi-heart" />}>My favorite</Button>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
            py: 4,
            justifyItems: 'flex-start',
            '& > .JoyTypography-body1': { color: 'primary.plainColor' },
          }}
        >
          <Typography level="body3" letterSpacing="md" textTransform="uppercase" fontWeight="lg">
            FontAwesome
          </Typography>
          <Typography level="body3" letterSpacing="md" textTransform="uppercase" fontWeight="lg">
            React icons (Ant)
          </Typography>
          <Typography level="body3" letterSpacing="md" textTransform="uppercase" fontWeight="lg">
            Octicons
          </Typography>
          <Typography level="body3" letterSpacing="md" textTransform="uppercase" fontWeight="lg">
            Feather
          </Typography>

          <Typography startDecorator={<FontAwesomeIcon icon={faHeart} />}>My favorite</Typography>
          <Typography startDecorator={<AiOutlineHeart />}>My favorite</Typography>
          <Typography startDecorator={<OcticonHeart />}>My favorite</Typography>
          <Typography startDecorator={<Heart />}>My favorite</Typography>

          <Button startIcon={<FontAwesomeIcon icon={faHeart} />}>My favorite</Button>
          {/* @ts-ignore */}
          <Button startIcon={<AiOutlineHeart />}>My favorite</Button>
          <Button startIcon={<OcticonHeart />}>My favorite</Button>
          <Button startIcon={<Heart />}>My favorite</Button>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
