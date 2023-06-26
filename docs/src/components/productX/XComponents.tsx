import * as React from 'react';
import { shouldForwardProp } from '@mui/system';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import TableChartRounded from '@mui/icons-material/TableChartRounded';
import DateRangeRounded from '@mui/icons-material/DateRangeRounded';
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import ShowChartRounded from '@mui/icons-material/ShowChartRounded';
import BarChartRounded from '@mui/icons-material/BarChartRounded';
import XGridFullDemo from 'docs/src/components/productX/XGridFullDemo';
import XDateRangeDemo from 'docs/src/components/productX/XDateRangeDemo';
import XTreeViewDemo from 'docs/src/components/productX/XTreeViewDemo';
import More from 'docs/src/components/action/More';
import ROUTES from 'docs/src/route';
import EmailSubscribe from 'docs/src/components/footer/EmailSubscribe';
import Frame from 'docs/src/components/action/Frame';
import IconImage from 'docs/src/components/icon/IconImage';
import dynamic from 'next/dynamic';

const XChartsDemo = dynamic(() => import('./XChartsDemo'), { ssr: false });

type DemosKeys = 'Data Grid' | 'Date Range Picker' | 'Charts' | 'Tree View' | 'Sparkline';
const DEMOS: DemosKeys[] = ['Data Grid', 'Date Range Picker', 'Charts', 'Tree View', 'Sparkline'];
const WIP = DEMOS.slice(3);

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

function PrefetchImages() {
  function makeImg(component: 'sparkline' | 'chart', mode: string, num: number) {
    return {
      loading: 'lazy' as const,
      width: 100,
      src: `/static/branding/mui-x/${component}-${mode}${num}.png`,
    };
  }
  return (
    <Box
      sx={{
        width: 0,
        height: 0,
        visibility: 'hidden',
        '& > img': {
          position: 'absolute',
        },
      }}
    >
      {[...Array(2)].map((_, index) => (
        <React.Fragment key={index}>
          <img alt="" {...makeImg('sparkline', 'light', index + 1)} />
          <img alt="" {...makeImg('sparkline', 'dark', index + 1)} />
        </React.Fragment>
      ))}
      {[...Array(4)].map((_, index) => (
        <React.Fragment key={index}>
          <img alt="" {...makeImg('chart', 'light', index + 1)} />
          <img alt="" {...makeImg('chart', 'dark', index + 1)} />
        </React.Fragment>
      ))}
    </Box>
  );
}

export default function XComponents() {
  const [demo, setDemo] = React.useState<DemosKeys>(DEMOS[1]);
  const icons = {
    'Data Grid': <TableChartRounded fontSize="small" />,
    'Date Range Picker': <DateRangeRounded fontSize="small" />,
    Charts: <BarChartRounded fontSize="small" />,
    'Tree View': <AccountTreeRounded fontSize="small" />,
    Sparkline: <ShowChartRounded fontSize="small" />,
  };
  return (
    <Section bg="comfort">
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="React component library"
              title={
                <Typography variant="h2">
                  Powerful components for <GradientText>advanced</GradientText> use-cases
                </Typography>
              }
              description="The MUI X package enables applications to have complex use-cases, supported by several advanced components."
            />
          </Box>
          <Group desktopColumns={2} sx={{ mt: 4 }}>
            {DEMOS.map((name) => (
              <Highlighter key={name} selected={name === demo} onClick={() => setDemo(name)}>
                <Item icon={React.cloneElement(icons[name])} title={name} />
                {WIP.includes(name) && (
                  <IconImage name="time" title="Work in progress" sx={{ ml: 'auto', mr: 2 }} />
                )}
              </Highlighter>
            ))}
            <More href={ROUTES.roadmap} />
          </Group>
        </Grid>
        <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
          <PrefetchImages />
          {demo === 'Data Grid' && (
            <Fade in timeout={500}>
              <Box sx={{ height: '100%' }}>
                <XGridFullDemo />
              </Box>
            </Fade>
          )}
          {demo === 'Date Range Picker' && (
            <Fade in timeout={500}>
              <div>
                <XDateRangeDemo />
              </div>
            </Fade>
          )}
          {demo === 'Tree View' && (
            <Fade in timeout={500}>
              <div>
                <XTreeViewDemo />
              </div>
            </Fade>
          )}
          {demo === 'Charts' && (
            <Fade in timeout={500}>
              <div>
                <XChartsDemo />
              </div>
            </Fade>
          )}
          {demo === 'Sparkline' && (
            <Fade in timeout={500}>
              <Box sx={{ height: '100%' }}>
                <Frame sx={{ height: '100%' }}>
                  <Frame.Demo sx={{ p: 2, flexGrow: 1 }}>
                    {demo === 'Sparkline' && (
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
                    )}
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
                      <Chip
                        variant="outlined"
                        label="PNG Preview"
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Subscribe to our newsletter to get first-hand info about the development and
                      release of new components.
                    </Typography>
                    <EmailSubscribe />
                  </Frame.Info>
                </Frame>
              </Box>
            </Fade>
          )}
        </Grid>
      </Grid>
    </Section>
  );
}
