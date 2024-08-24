import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { alpha } from '@mui/material/styles';

interface HeroContainerProps {
  disableMobileHidden?: boolean;
  disableTabExclusion?: boolean;
  left: React.ReactElement;
  linearGradient?: boolean;
  right: React.ReactElement;
  rightSx?: BoxProps['sx'];
}

export default function HeroContainer({
  disableMobileHidden,
  disableTabExclusion = false,
  left,
  linearGradient,
  right,
  rightSx,
}: HeroContainerProps) {
  const frameRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!disableTabExclusion && frameRef.current) {
      const elements = frameRef.current.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
      );
      elements.forEach((elm) => elm.setAttribute('tabindex', '-1'));
    }
  }, [disableTabExclusion]);

  const renderRightWrapper = (sx?: BoxProps['sx']) => (
    <Box
      ref={frameRef}
      aria-hidden={disableTabExclusion ? undefined : 'true'}
      sx={[
        (theme) => ({
          minWidth: '50vw',
          minHeight: { xs: 'auto', sm: 500 },
          height: 'calc(100vh - 120px)',
          maxHeight: { md: 700, xl: 850 },
          borderBottomLeftRadius: 12,
          transition: 'max-height 0.3s',
          position: 'relative',
          overflow: 'hidden',
          borderLeft: '1px solid',
          borderBottom: '1px solid',
          borderColor: 'divider',
          ...(linearGradient && {
            background: `radial-gradient(farthest-corner circle at 0% 0%, ${
              (theme.vars || theme).palette.grey[50]
            } 0%, ${(theme.vars || theme).palette.primary[50]} 100%)`,
          }),
        }),
        (theme) =>
          theme.applyDarkStyles({
            background: 'primaryDark.900',
            borderColor: 'primaryDark.700',
            ...(linearGradient && {
              background: `radial-gradient(farthest-corner circle at 0% 0%, ${alpha(
                theme.palette.primary[900],
                0.2,
              )} 0%, ${(theme.vars || theme).palette.primaryDark[900]} 100%)`,
            }),
          }),
        ...(Array.isArray(sx) ? sx : [sx]),
        ...(Array.isArray(rightSx) ? rightSx : [rightSx]),
      ]}
    >
      {right}
    </Box>
  );

  const containerSx = {
    minHeight: { xs: 'auto', sm: 500 },
    height: { md: 'calc(100vh - 120px)' },
    maxHeight: { md: 700, xl: 850 },
    transition: '0.3s',
  };

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Container sx={containerSx}>
        <Grid container sx={{ alignItems: 'center', flexWrap: 'nowrap', height: '100%', mx: 'auto' }}>
          <Grid item md={7} lg={6} sx={{ m: 'auto' }}>
            {left}
          </Grid>
          <Grid item md={5} lg={6} sx={{ maxHeight: '100%', display: disableMobileHidden ? { xs: 'flex', md: 'block' } : { xs: 'none', md: 'initial' } }}>
            {renderRightWrapper(disableMobileHidden ? {
              height: {
                xs: 'initial',
                md: 'calc(100vh - 120px)',
              },
              borderLeftWidth: { xs: 0, md: 1 },
              borderBottomLeftRadius: { xs: 0, md: 12 },
              mx: { xs: -2, sm: -3, md: 'initial' },
            } : undefined)}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
