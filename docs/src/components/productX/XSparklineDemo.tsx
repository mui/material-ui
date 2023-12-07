import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';
import EmailSubscribe from 'docs/src/components/footer/EmailSubscribe';
import Frame from 'docs/src/components/action/Frame';

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

export default function XSparklineDemo() {
  return (
    <Box sx={{ height: '100%' }}>
      <Frame sx={{ height: '100%' }}>
        <Frame.Demo sx={{ p: 2, flexGrow: 1 }}>
          <Grid container justifyContent="space-around" spacing={1}>
            <Grid item xs={6}>
              <Box sx={{ maxWidth: 200, ml: 'auto' }}>
                <AspectRatioImage
                  src="/static/branding/mui-x/sparkline-light1.png"
                  ratio={211 / 220}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ maxWidth: 200, mr: 'auto' }}>
                <AspectRatioImage
                  src="/static/branding/mui-x/sparkline-light2.png"
                  ratio={211 / 220}
                />
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
              Coming soon!
            </Typography>
            <Chip variant="outlined" label="PNG Preview" size="small" sx={{ fontWeight: 500 }} />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Subscribe to our newsletter to get first-hand info about the development and release of
            new components.
          </Typography>
          <EmailSubscribe />
        </Frame.Info>
      </Frame>
    </Box>
  );
}
