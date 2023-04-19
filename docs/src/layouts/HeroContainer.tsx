import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export default function HeroContainer({
  left,
  right,
  rightRef,
  rightSx,
  enablePattern,
}: {
  left: React.ReactElement;
  right: React.ReactElement;
  rightRef?: React.MutableRefObject<HTMLDivElement | null>;
  rightSx?: BoxProps['sx'];
  enablePattern?: boolean;
}) {
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
              ref={rightRef}
              id="hero-container-right-area"
              aria-hidden="true"
              sx={[
                (theme) => ({
                  minWidth: '50vw',
                  minHeight: 500,
                  height: 'calc(100vh - 120px)',
                  maxHeight: { md: 700, xl: 1000 },
                  borderBottomLeftRadius: 12,
                  transition: 'max-height 0.3s',
                  position: 'relative',
                  overflow: 'hidden',
                  ...(enablePattern && {
                    borderLeft: '1px solid',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    backgroundImage: `radial-gradient(50% 50% at 50% 50%, transparent 20%, rgba(102, 178, 255, 0.2)
                    1%, rgba(240, 247, 255, 0.5) 120%), ${
                      (theme.vars || theme).palette.patterns.triangle
                    }`,
                  }),
                }),
                (theme) =>
                  theme.applyDarkStyles({
                    bgcolor: 'primaryDark.900',
                    ...(enablePattern && {
                      backgroundImage: `radial-gradient(50% 50% at 50% 50%, transparent 20%, rgba(0, 89, 178, 0.2)
                      1%, rgba(29, 36, 43, 0.8) 120%), ${
                        (theme.vars || theme).palette.patterns.triangle
                      }`,
                    }),
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
