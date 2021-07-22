import * as React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowRightRounded from '@material-ui/icons/KeyboardArrowRightRounded';
import ContentCopyRounded from '@material-ui/icons/ContentCopyRounded';
import GradientText from 'docs/src/components/GradientText';

export default function Hero() {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Container
        sx={{
          minHeight: 500,
          height: 'calc(100vh - 120px)',
          maxHeight: { xs: 500, sm: 700, xl: 1000 },
        }}
      >
        <Grid
          container
          alignItems="center"
          wrap="nowrap"
          sx={{ height: '100%', maxWidth: { xs: 500, md: 'initial' }, mx: 'auto' }}
        >
          <Grid item md={7} lg={6}>
            <Box textAlign={{ xs: 'center', md: 'left' }} maxWidth={500}>
              <Typography
                variant="h1"
                fontWeight="extraBold"
                fontSize="clamp(2.625rem, 1.2857rem + 3.5714vw, 4.5rem)"
                lineHeight={1.11}
                mb={2}
              >
                The <GradientText>ultimate</GradientText> solution for your UI.
              </Typography>
              <Typography color="text.secondary" mb={3}>
                MUI provides robust, customizable, and accessible components, enabling you to build
                React applications faster. With a trusted open-source community and beautiful
                designs, developing UIs have never been easier.
              </Typography>
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent={{ xs: 'center', md: 'flex-start' }}
                sx={{ '&& > *': { minWidth: 'clamp(0px, (449px - 100%) * 999 ,100%)' } }}
              >
                <Button size="large" variant="contained" endIcon={<KeyboardArrowRightRounded />}>
                  Get Started
                </Button>
                <Box width={16} height={16} />
                <Button
                  size="large"
                  // @ts-expect-error TODO: fix this by exporting Overrides types from Button
                  variant="code"
                  startIcon="$"
                  endIcon={<ContentCopyRounded />}
                >
                  npm install @mui/core
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            md={5}
            lg={6}
            sx={{ maxHeight: '100%', display: { xs: 'none', md: 'initial' } }}
          >
            <Box
              minWidth={2000}
              bgcolor="grey.50"
              sx={{
                minHeight: 500,
                height: 'calc(100vh - 120px)',
                maxHeight: { lg: 700, xl: 1000 },
                borderBottomLeftRadius: 10,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
