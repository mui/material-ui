import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
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
            <Box sx={{ width: { xs: 200, sm: 240 }, maxWidth: '100%', ml: 'auto' }}>
              <AspectRatioImage src="/static/branding/mui-x/chart-light1.png" ratio={219 / 120} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ width: { xs: 200, sm: 240 }, maxWidth: '100%', mr: 'auto' }}>
              <AspectRatioImage src="/static/branding/mui-x/chart-light2.png" ratio={219 / 120} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ width: { xs: 200, sm: 240 }, maxWidth: '100%', ml: 'auto' }}>
              <AspectRatioImage src="/static/branding/mui-x/chart-light3.png" ratio={219 / 120} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ width: { xs: 200, sm: 240 }, maxWidth: '100%', mr: 'auto' }}>
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
            justifyContent: 'space-between',
            lineHeight: 1,
            mb: 0.5,
          }}
        >
          <Typography variant="body2" fontWeight="bold" sx={{ mr: 1 }}>
            🎉&nbsp;&nbsp;&nbsp; Charts now in Alpha! 
          </Typography>
          <Button
            variant="outlined"
            href="/x/react-charts/"
            component="a"
            sx={{ color: 'primary.300', flexShrink: 0 }}
          >
            Overview
          </Button>
        </Box>
      </Frame.Info>
    </Frame>
  );
}
