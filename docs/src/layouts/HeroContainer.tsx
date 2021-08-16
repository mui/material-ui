import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

export default function HeroContainer({
  left,
  right,
  rightSx,
}: {
  left: React.ReactElement;
  right: React.ReactElement;
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
        <Grid
          container
          alignItems="center"
          wrap="nowrap"
          sx={{ height: '100%', maxWidth: { xs: 512, md: 'initial' }, mx: 'auto' }}
        >
          <Grid item md={7} lg={6}>
            {left}
          </Grid>
          <Grid
            item
            md={5}
            lg={6}
            sx={{ maxHeight: '100%', display: { xs: 'none', md: 'initial' } }}
          >
            <Box
              aria-hidden="true"
              sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : 'grey.50'),
                minWidth: '50vw',
                minHeight: 500,
                height: 'calc(100vh - 120px)',
                maxHeight: { lg: 700, xl: 1000 },
                borderBottomLeftRadius: 10,
                transition: 'max-height 0.3s',
                position: 'relative',
                overflow: 'hidden',
                ...rightSx,
              }}
            >
              {right}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
