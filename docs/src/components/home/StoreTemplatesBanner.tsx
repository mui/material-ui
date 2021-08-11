import * as React from 'react';
import { styled, alpha } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import ROUTES from 'docs/src/route';
import LaunchRounded from '@material-ui/icons/LaunchRounded';

const ratio = 1367 / 939;

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
  '&:hover': {
    '& > div': {
      opacity: 1,
    },
  },
});

const StoreTemplate = React.forwardRef<
  HTMLAnchorElement,
  { brand: 'material-app' | 'barza' | 'minimal-free' | 'minimal-dashboard' | 'berry' | 'webbee' }
>(({ brand, ...props }, ref) => {
  const linkMapping = {
    'material-app': ROUTES.storeTemplateMaterialApp,
    barza: ROUTES.storeTemplateBarza,
    'minimal-free': ROUTES.storeTemplateMinimalFree,
    'minimal-dashboard': ROUTES.storeTemplateMinimalDashboard,
    berry: ROUTES.storeTemplateBerry,
    webbee: ROUTES.storeTemplateBerry,
  };
  return (
    <Anchor
      ref={ref}
      aria-label="Goto MUI store"
      href={linkMapping[brand]}
      target="_blank"
      {...props}
    >
      <Image
        src={`/static/branding/store-templates/store-template${
          Object.keys(linkMapping).indexOf(brand) + 1
        }.jpeg`}
        alt=""
      />
      <Box
        sx={{
          transition: '0.3s',
          borderRadius: 1,
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0,
          top: 0,
          left: 0,
          bgcolor: (theme) => alpha(theme.palette.primaryDark[500], 0.8),
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography fontWeight="bold">Goto store</Typography>
        <LaunchRounded fontSize="small" sx={{ ml: 1 }} />
      </Box>
    </Anchor>
  );
});

export const LazyStoreTemplateImages = () => (
  <Box
    sx={{
      width: 0,
      height: 0,
      display: 'none',
      overflow: 'hidden',
      position: 'absolute',
      zIndex: -1,
    }}
  >
    <img src="/static/branding/store-templates/store-template1.jpeg" alt="" loading="lazy" />
    <img src="/static/branding/store-templates/store-template2.jpeg" alt="" loading="lazy" />
    <img src="/static/branding/store-templates/store-template3.jpeg" alt="" loading="lazy" />
    <img src="/static/branding/store-templates/store-template4.jpeg" alt="" loading="lazy" />
    <img src="/static/branding/store-templates/store-template5.jpeg" alt="" loading="lazy" />
    <img src="/static/branding/store-templates/store-template6.jpeg" alt="" loading="lazy" />
  </Box>
);

export default function StoreTemplatesBanner() {
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
          pointerEvents: 'none',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : 'grey.50'),
          opacity: (theme) => (theme.palette.mode === 'dark' ? 0.6 : 0),
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
          pointerEvents: 'none',
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
          pointerEvents: 'none',
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
          left: '50%',
          position: 'absolute',
          display: 'flex',
          transform: 'translateX(-40%) rotateZ(-30deg) rotateX(8deg) rotateY(8deg)',
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
            <StoreTemplate brand="material-app" />
          </Fade>
          <Fade in={appearIndexes.includes(2)} timeout={1000}>
            <StoreTemplate brand="minimal-free" />
          </Fade>
          <Fade in={appearIndexes.includes(0)} timeout={1000}>
            <StoreTemplate brand="berry" />
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
            <StoreTemplate brand="barza" />
          </Fade>
          <Fade in={appearIndexes.includes(3)} timeout={1000}>
            <StoreTemplate brand="minimal-dashboard" />
          </Fade>
          <Fade in={appearIndexes.includes(5)} timeout={1000}>
            <StoreTemplate brand="webbee" />
          </Fade>
        </Box>
      </Box>
    </Box>
  );
}
