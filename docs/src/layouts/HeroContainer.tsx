import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';

export default function HeroContainer({
  left,
  right,
  rightSx,
}: {
  left: React.ReactElement;
  right: React.ReactElement;
  rightSx?: BoxProps['sx'];
}) {
  const frame = React.useRef<null | HTMLDivElement>(null);
  const globalTheme = useTheme();
  const isMdUp = useMediaQuery(globalTheme.breakpoints.up('md'));

  React.useEffect(() => {
    let obs: undefined | MutationObserver;
    function suppressTabIndex() {
      if (frame.current && isMdUp) {
        const elements = frame.current.querySelectorAll(
          'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
        );
        elements.forEach((elm) => {
          elm.setAttribute('tabindex', '-1');
        });
      }
    }
    if (typeof MutationObserver !== 'undefined' && frame.current) {
      obs = new MutationObserver(suppressTabIndex);
      obs.observe(frame.current, { childList: true, subtree: true });
    }
    return () => {
      if (obs) {
        obs.disconnect();
      }
    };
  }, [isMdUp]);

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Container
        sx={{
          minHeight: 500,
          height: 'calc(100vh - 120px)',
          maxHeight: { xs: 500, sm: 700, xl: 1000 },
          transition: '0.3s',
        }}
      >
        <Grid container alignItems="center" wrap="nowrap" sx={{ height: '100%', mx: 'auto' }}>
          <Grid item md={7} lg={6} sx={{ m: 'auto' }}>
            {left}
          </Grid>
          <Grid
            item
            md={5}
            lg={6}
            sx={{ maxHeight: '100%', display: { xs: 'none', md: 'initial' } }}
          >
            <Box
              ref={frame}
              aria-hidden="true"
              sx={[
                {
                  bgcolor: 'grey.50',
                  minWidth: '50vw',
                  minHeight: 500,
                  height: 'calc(100vh - 120px)',
                  maxHeight: { md: 700, xl: 1000 },
                  borderBottomLeftRadius: 10,
                  transition: 'max-height 0.3s',
                  position: 'relative',
                  overflow: 'hidden',
                },
                (theme) =>
                  theme.applyDarkStyles({
                    bgcolor: 'primaryDark.900',
                  }),
                ...(Array.isArray(rightSx) ? rightSx : [rightSx]),
              ]}
            >
              {right}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
