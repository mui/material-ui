import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { alpha, styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';
import Frame from 'docs/src/components/action/Frame';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const AspectRatioImage = styled('div', {
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'src' && prop !== 'ratio',
})<{ ratio: number; src: string }>(({ src, ratio, theme }) => ({
  height: 0,
  backgroundImage: `url(${src})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  paddingBottom: `${(1 / ratio) * 100}%`,
  margin: 'auto',
  ...theme.applyDarkStyles({
    backgroundImage: `url(${src.replace('-light', '-dark')})`,
  }),
}));

export default function XChartsDemo() {
  return (
    <Frame sx={{ height: '100%' }}>
      <Frame.Demo sx={{ p: 2, flexGrow: 1 }}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={6}>
            <Box sx={{ width: { xs: 200, sm: '100%' }, maxWidth: '100%', ml: 'auto' }}>
              <AspectRatioImage src="/static/branding/mui-x/chart-light1.png" ratio={219 / 120} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ width: { xs: 200, sm: '100%' }, maxWidth: '100%', mr: 'auto' }}>
              <AspectRatioImage src="/static/branding/mui-x/chart-light2.png" ratio={219 / 120} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ width: { xs: 200, sm: '100%' }, maxWidth: '100%', ml: 'auto' }}>
              <AspectRatioImage src="/static/branding/mui-x/chart-light3.png" ratio={219 / 120} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ width: { xs: 200, sm: '100%' }, maxWidth: '100%', mr: 'auto' }}>
              <AspectRatioImage src="/static/branding/mui-x/chart-light4.png" ratio={219 / 120} />
            </Box>
          </Grid>
        </Grid>
      </Frame.Demo>
      <Frame.Info data-mui-color-scheme="dark">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            lineHeight: 1,
            mb: 0.5,
          }}
        >
          <Typography variant="body2" fontWeight="bold" sx={{ mr: 1 }}>
            Experiment with Charts now!
          </Typography>
          <Chip
            variant="outlined"
            label="Alpha"
            color="warning"
            size="small"
            sx={(theme) => ({
              pb: 0.2,
              fontWeight: theme.typography.fontWeightSemiBold,
              color: (theme.vars || theme).palette.warning[300],
              borderColor: alpha(theme.palette.warning[300], 0.3),
              background: alpha(theme.palette.warning[800], 0.3),
            })}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Using D3.js for data manipulation and SVG for rendering, Charts are coming to MUI X!
        </Typography>
        <Button
          variant="outlined"
          href="/x/react-charts/"
          component="a"
          sx={{ mt: { xs: 2, sm: 0 }, color: 'primary.300' }}
        >
          View the documentation
        </Button>
      </Frame.Info>
    </Frame>
  );
}
