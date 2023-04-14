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
                  ...(enablePattern && {
                    borderLeft: '1px solid',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    backgroundImage:
                      'url(/static/branding/background-pattern.svg), linear-gradient(315deg, rgba(194 224 255 / 0.4), #fff, rgba(240 247 255 / 0.7))',
                  }),
                },
                (theme) =>
                  theme.applyDarkStyles({
                    bgcolor: 'primaryDark.900',
                    ...(enablePattern && {
                      backgroundImage:
                        'url(/static/branding/background-pattern-dark.svg), linear-gradient(315deg, rgba(0 76 153 / 1), rgba(20 25 31 / 1), rgba(0 58 117 / 1))',
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
