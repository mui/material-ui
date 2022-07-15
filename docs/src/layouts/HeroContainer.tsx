import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export default function HeroContainer({
  left,
  right,
  rightRef,
  rightSx,
}: {
  left: React.ReactElement;
  right: React.ReactElement;
  rightRef?: React.MutableRefObject<HTMLDivElement | null>;
  rightSx?: BoxProps['sx'];
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
                  ...(!theme.vars
                    ? {
                        bgcolor: theme.palette.mode === 'dark' ? 'primaryDark.900' : 'grey.50',
                      }
                    : {
                        bgcolor: 'grey.50',
                        [theme.getColorSchemeSelector('dark')]: {
                          bgcolor: 'primaryDark.900',
                        },
                      }),
                  minWidth: '50vw',
                  minHeight: 500,
                  height: 'calc(100vh - 120px)',
                  maxHeight: { md: 700, xl: 1000 },
                  borderBottomLeftRadius: 10,
                  transition: 'max-height 0.3s',
                  position: 'relative',
                  overflow: 'hidden',
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
