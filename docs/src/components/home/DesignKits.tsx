import * as React from 'react';
import { styled, alpha } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import ROUTES from 'docs/src/route';
import LaunchRounded from '@material-ui/icons/LaunchRounded';

const ratio = 900 / 494;

const Image = styled('img')(({ theme }) => ({
  display: 'block',
  width: 200,
  height: 200 / ratio,
  [theme.breakpoints.up('sm')]: {
    width: 300,
    height: 300 / ratio,
  },
  [theme.breakpoints.up('md')]: {
    width: 450,
    height: 450 / ratio,
  },
  border: '6px solid',
  borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400],
  borderRadius: theme.shape.borderRadius,
  objectFit: 'cover',
  filter: 'drop-shadow(0px 4px 20px rgba(61, 71, 82, 0.25))',
}));

const Anchor = styled('a')({
  display: 'inline-block',
  position: 'relative',
  transition: '0.3s',
  borderRadius: '50%',
  '&:hover, &:focus': {
    boxShadow: '0 6px 12px 0 rgba(0,0,0,0.12)',
    '& > div': {
      opacity: 1,
    },
  },
});

const DesignTool = React.forwardRef<HTMLAnchorElement, { brand: 'figma' | 'sketch' | 'xd' }>(
  ({ brand, ...props }, ref) => {
    return (
      <Anchor
        ref={ref}
        aria-label="Goto MUI store"
        href={{ figma: ROUTES.storeFigma, sketch: ROUTES.storeSketch, xd: ROUTES.storeXD }[brand]}
        target="_blank"
        {...props}
      >
        <Avatar src={`/static/branding/design-kits/designkits-${brand}.png`} alt="" />
        <Box
          sx={{
            transition: '0.3s',
            borderRadius: '50%',
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0,
            top: 0,
            left: 0,
            bgcolor: (theme) => alpha(theme.palette.primaryDark[500], 0.8),
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LaunchRounded />
        </Box>
      </Anchor>
    );
  },
);

export const LazyDesignKitImages = () => (
  <Box
    sx={{
      width: 0,
      height: 0,
      position: 'fixed',
      top: -1000,
      zIndex: -1,
      '& > img': {
        position: 'absolute',
      },
    }}
  >
    <img src="/static/branding/design-kits/designkits1.jpeg" alt="" loading="lazy" />
    <img src="/static/branding/design-kits/designkits2.jpeg" alt="" loading="lazy" />
    <img src="/static/branding/design-kits/designkits3.jpeg" alt="" loading="lazy" />
    <img src="/static/branding/design-kits/designkits4.jpeg" alt="" loading="lazy" />
    <img src="/static/branding/design-kits/designkits5.jpeg" alt="" loading="lazy" />
    <img src="/static/branding/design-kits/designkits6.jpeg" alt="" loading="lazy" />
  </Box>
);

export default function DesignKits() {
  const [appearIndexes, setAppearIndexes] = React.useState<Array<number>>([0]);
  React.useEffect(() => {
    const time = setTimeout(() => {
      if (appearIndexes.length < 6) {
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
        mx: { xs: -2, sm: -3, md: 0 },
        my: { md: -8 },
        perspective: '1000px',
        height: { xs: 300, sm: 360, md: 'calc(100% + 160px)' },
        overflow: 'hidden',
        position: 'relative',
        width: { xs: '100vw', md: '50vw' },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : 'grey.50'),
          opacity: 0.6,
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: (theme) =>
            `linear-gradient(to bottom, ${
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[900]
                : theme.palette.grey[50]
            } 0%, transparent 30%, transparent 70%, ${
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[900]
                : theme.palette.grey[50]
            } 100%)`,
          zIndex: 2,
        }}
      />
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          top: 0,
          left: 0,
          width: 400,
          height: '100%',
          background: (theme) =>
            `linear-gradient(to right, ${
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[900]
                : theme.palette.grey[50]
            }, transparent)`,
          zIndex: 2,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          transform: { xs: 'translate(-50%, -50%)' },
          left: { xs: '50%' },
          zIndex: 10,
          display: 'grid',
          gap: { xs: 3, lg: 6 },
          py: 4,
          gridTemplateColumns: '1fr 1fr 1fr',
          '& .MuiAvatar-root': {
            width: { xs: 80, sm: 100 },
            height: { xs: 80, sm: 100 },
            filter: (theme) =>
              `drop-shadow(0px 3.57436px 44.6795px ${
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[900]
                  : 'rgba(90, 105, 120, 0.36)'
              })`,
          },
        }}
      >
        <Fade in={appearIndexes.includes(0)} timeout={1000}>
          <DesignTool brand="figma" />
        </Fade>
        <Fade in={appearIndexes.includes(1)} timeout={1000}>
          <DesignTool brand="sketch" />
        </Fade>
        <Fade in={appearIndexes.includes(2)} timeout={1000}>
          <DesignTool brand="xd" />
        </Fade>
      </Box>
      <Box
        sx={{
          left: '36%',
          position: 'absolute',
          display: 'flex',
          transform: 'translateX(-40%) rotateZ(30deg) rotateX(8deg) rotateY(-8deg)',
          transformOrigin: 'center center',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateRows: 'min-content',
            gap: { xs: 2, sm: 4, md: 8 },
            width: 'min-content',
            animation: 'slideup 20s ease-out forwards',
            '@keyframes slideup': {
              '0%': {
                transform: 'translateY(-250px)',
              },
              '100%': {
                transform: 'translateY(-60px)',
              },
            },
          }}
        >
          <Fade in={appearIndexes.includes(4)} timeout={1000}>
            <Image src="/static/branding/design-kits/designkits1.jpeg" alt="" />
          </Fade>
          <Fade in={appearIndexes.includes(2)} timeout={1000}>
            <Image src="/static/branding/design-kits/designkits3.jpeg" alt="" />
          </Fade>
          <Fade in={appearIndexes.includes(0)} timeout={1000}>
            <Image src="/static/branding/design-kits/designkits5.jpeg" alt="" />
          </Fade>
        </Box>
        <Box
          sx={{
            ml: { xs: 2, sm: 4, md: 8 },
            display: 'grid',
            gridTemplateRows: 'min-content',
            gap: { xs: 2, sm: 4, md: 8 },
            width: 'min-content',
            animation: 'slidedown 20s ease-out forwards',
            '@keyframes slidedown': {
              '0%': {
                transform: 'translateY(125px)',
              },
              '100%': {
                transform: 'translateY(-120px)',
              },
            },
          }}
        >
          <Fade in={appearIndexes.includes(1)} timeout={1000}>
            <Image src="/static/branding/design-kits/designkits2.jpeg" alt="" />
          </Fade>
          <Fade in={appearIndexes.includes(3)} timeout={1000}>
            <Image src="/static/branding/design-kits/designkits4.jpeg" alt="" />
          </Fade>
          <Fade in={appearIndexes.includes(5)} timeout={1000}>
            <Image src="/static/branding/design-kits/designkits6.jpeg" alt="" />
          </Fade>
        </Box>
      </Box>
    </Box>
  );
}
