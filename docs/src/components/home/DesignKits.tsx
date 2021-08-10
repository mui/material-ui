import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';

const Image = styled('img')({
  display: 'block',
  position: 'absolute',
  top: 0,
  right: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'top left',
});

export const LazyDesignKitsBg = () => (
  <Box
    sx={{
      display: 'none',
      overflow: 'hidden',
      width: '0px',
      height: '0px',
      position: 'absolute',
      zIndex: -1,
    }}
  >
    <img src="/static/branding/design-kits/designkits-bg.png" alt="" loading="lazy" />
  </Box>
);

export default function DesignKits() {
  const [appearIndexes, setAppearIndexes] = React.useState<Array<number>>([0]);
  React.useEffect(() => {
    const time = setTimeout(() => {
      if (appearIndexes.length < 3) {
        setAppearIndexes((current) => [...current, current.length]);
      }
    }, 200);
    return () => {
      clearTimeout(time);
    };
  }, [appearIndexes]);
  return (
    <Box
      sx={{
        position: 'relative',
        ml: { md: 4 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        minHeight: { xs: 300, sm: 360 },
      }}
    >
      <Fade in timeout={500}>
        <Box
          sx={{
            top: 0,
            left: 0,
            position: 'absolute',
            height: { xs: '50vh', sm: '80vh' },
            maxHeight: 780,
            width: { xs: '100vw', md: '50vw' },
            maxWidth: 780,
          }}
        >
          <Image src="/static/branding/design-kits/designkits-bg.png" alt="" />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              opacity: 0.72,
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : 'grey.50'),
            }}
          />
        </Box>
      </Fade>
      <Box
        sx={{
          display: 'grid',
          gap: { xs: 3, md: 6 },
          py: 4,
          gridTemplateColumns: '1fr 1fr 1fr',
          '& .MuiAvatar-root': {
            width: { xs: 80, sm: 100 },
            height: { xs: 80, sm: 100 },
            filter: (theme) =>
              `drop-shadow(0px 3.57436px 44.6795px ${
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[900]
                  : 'rgba(90, 105, 120, 0.25)'
              })`,
          },
        }}
      >
        <Fade in={appearIndexes.includes(0)} timeout={1000}>
          <Avatar src="/static/branding/design-kits/designkits-figma.png" alt="" />
        </Fade>
        <Fade in={appearIndexes.includes(1)} timeout={1000}>
          <Avatar src="/static/branding/design-kits/designkits-sketch.png" alt="" />
        </Fade>
        <Fade in={appearIndexes.includes(2)} timeout={1000}>
          <Avatar src="/static/branding/design-kits/designkits-xd.png" alt="" />
        </Fade>
      </Box>
    </Box>
  );
}
