import * as React from 'react';
import { styled, alpha } from '@material-ui/core/styles';
import Avatar, { AvatarProps } from '@material-ui/core/Avatar';
import Box, { BoxProps } from '@material-ui/core/Box';
import ROUTES from 'docs/src/route';
import LaunchRounded from '@material-ui/icons/LaunchRounded';
import Slide from 'docs/src/components/animation/Slide';
import FadeDelay from 'docs/src/components/animation/FadeDelay';

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
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0px 4px 20px rgba(0, 0, 0, 0.6)'
      : '0px 4px 20px rgba(61, 71, 82, 0.25)',
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

const DesignToolLink = React.forwardRef<
  HTMLAnchorElement,
  React.PropsWithChildren<{ brand: 'figma' | 'sketch' | 'xd' }>
>(({ brand, ...props }, ref) => (
  <Anchor
    ref={ref}
    aria-label="Goto MUI store"
    href={{ figma: ROUTES.storeFigma, sketch: ROUTES.storeSketch, xd: ROUTES.storeXD }[brand]}
    target="_blank"
    {...props}
  >
    {props.children}
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
        bgcolor: (theme) =>
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.primaryDark[800], 0.5)
            : alpha(theme.palette.primary[500], 0.5),
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
));

const DesignToolLogo = React.forwardRef<
  HTMLImageElement,
  { brand: 'figma' | 'sketch' | 'xd' } & AvatarProps
>(({ brand, ...props }, ref) => (
  <Avatar
    ref={ref}
    src={`/static/branding/design-kits/designkits-${brand}.png`}
    alt=""
    {...props}
    sx={{
      boxShadow: (theme) =>
        `0px 3.57436px 44.6795px ${
          theme.palette.mode === 'dark'
            ? theme.palette.primaryDark[900]
            : 'rgba(90, 105, 120, 0.36)'
        }`,
      ...props.sx,
    }}
  />
));

export const PrefetchDesignKitImages = () => (
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
    <img src="/static/branding/design-kits/designkits-figma.png" alt="" loading="lazy" />
    <img src="/static/branding/design-kits/designkits-sketch.png" alt="" loading="lazy" />
    <img src="/static/branding/design-kits/designkits-xd.png" alt="" loading="lazy" />
  </Box>
);

const defaultSlideUp = {
  '0%': {
    transform: 'translateY(-300px)',
  },
  '100%': {
    transform: 'translateY(-20px)',
  },
};
export function DesignKitImagesSet1({
  keyframes = defaultSlideUp,
  ...props
}: BoxProps & { keyframes?: Record<string, object> }) {
  return (
    <Slide animationName="designkit-slideup" {...props} keyframes={keyframes}>
      <FadeDelay delay={400}>
        <Image src="/static/branding/design-kits/designkits1.jpeg" alt="" />
      </FadeDelay>
      <FadeDelay delay={200}>
        <Image src="/static/branding/design-kits/designkits3.jpeg" alt="" />
      </FadeDelay>
      <FadeDelay delay={0}>
        <Image src="/static/branding/design-kits/designkits5.jpeg" alt="" />
      </FadeDelay>
    </Slide>
  );
}

const defaultSlideDown = {
  '0%': {
    transform: 'translateY(150px)',
  },
  '100%': {
    transform: 'translateY(-80px)',
  },
};
export function DesignKitImagesSet2({
  keyframes = defaultSlideDown,
  ...props
}: BoxProps & { keyframes?: Record<string, object> }) {
  return (
    <Slide animationName="designkit-slidedown" {...props} keyframes={keyframes}>
      <FadeDelay delay={100}>
        <Image src="/static/branding/design-kits/designkits2.jpeg" alt="" />
      </FadeDelay>
      <FadeDelay delay={300}>
        <Image src="/static/branding/design-kits/designkits4.jpeg" alt="" />
      </FadeDelay>
      <FadeDelay delay={500}>
        <Image src="/static/branding/design-kits/designkits6.jpeg" alt="" />
      </FadeDelay>
    </Slide>
  );
}

export function DesignKitTools({ disableLink, ...props }: { disableLink?: boolean } & BoxProps) {
  function renderTool(brand: 'figma' | 'sketch' | 'xd') {
    if (disableLink) return <DesignToolLogo brand={brand} />;
    return (
      <DesignToolLink brand={brand}>
        <DesignToolLogo brand={brand} />
      </DesignToolLink>
    );
  }
  return (
    <Box
      {...props}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        display: 'grid',
        gap: { xs: 3, lg: 6 },
        py: 4,
        gridTemplateColumns: '1fr 1fr 1fr',
        '& .MuiAvatar-root': {
          width: { xs: 80, sm: 100 },
          height: { xs: 80, sm: 100 },
        },
        ...props.sx,
      }}
    >
      <FadeDelay delay={200}>{renderTool('figma')}</FadeDelay>
      <FadeDelay delay={400}>{renderTool('sketch')}</FadeDelay>
      <FadeDelay delay={600}>{renderTool('xd')}</FadeDelay>
    </Box>
  );
}

export default function DesignKits() {
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
      <DesignKitTools
        sx={{
          top: { xs: '50%', md: 'calc(50% + 80px)', xl: '50%' },
          transform: { xs: 'translate(-50%, -50%)' },
          left: { xs: 'min(50%, 500px)' },
        }}
      />
      <Box
        sx={{
          left: '36%',
          position: 'absolute',
          display: 'flex',
          transform: 'translateX(-40%) rotateZ(30deg) rotateX(8deg) rotateY(-8deg)',
          transformOrigin: 'center center',
        }}
      >
        <DesignKitImagesSet1 />
        <DesignKitImagesSet2 sx={{ ml: { xs: 2, sm: 4, md: 8 } }} />
      </Box>
    </Box>
  );
}
