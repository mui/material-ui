import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SvgTwinkle from 'docs/src/icons/SvgTwinkle';
import Section from 'docs/src/layouts/Section';
import Highlighter from 'docs/src/components/action/Highlighter';
import Item, { Group } from 'docs/src/components/action/Item';
import GradientText from 'docs/src/components/typography/GradientText';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Frame from 'docs/src/components/action/Frame';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';

export default function JoyUIFeatures() {
  const [index, setIndex] = React.useState(0);
  function getSelectedProps(i: number) {
    return {
      selected: index === i,
      sx: { '& svg': { opacity: index === i ? 1 : 0.5 } },
    };
  }
  return (
    <Section bg="white">
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="Features"
              title={
                <Typography variant="h2">
                  Powerful <GradientText>tools to customize</GradientText> each and every piece
                </Typography>
              }
              description="Joy UI is built to ensure you ship great products to your users with an amazing developer experience."
            />
          </Box>
          <Group sx={{ mt: 4 }}>
            <Highlighter disableBorder {...getSelectedProps(0)} onClick={() => setIndex(0)}>
              <Item
                icon={<SvgTwinkle />}
                title="Global variants"
                description="WPull their styles from a single source, helping you to ensure a consistent look and feel across both pre-built Joy UI components and any custom components you build."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(1)} onClick={() => setIndex(1)}>
              <Item
                icon={<SvgTwinkle />}
                title="Color inversion"
                description="With color inversion set on the parent component, its children with implicit color will invert they styles to have a matching design."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(2)} onClick={() => setIndex(2)}>
              <Item
                icon={<SvgTwinkle />}
                title="Automatic adjustment"
                description="All Joy UI components work together to ensure consistency and save your time with micro CSS tweaks."
              />
            </Highlighter>
          </Group>
        </Grid>
        <Grid item xs={12} md={6}>
          <Frame sx={{ height: '100%' }}>
            <Frame.Demo
              sx={{
                bgcolor: 'background.paper',
                overflow: 'auto',
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Demo
            </Frame.Demo>
            <Frame.Info
              sx={{
                maxHeight: 450,
                overflow: 'auto',
              }}
            >
              <Box sx={{ position: 'relative', '&& pre': { bgcolor: 'transparent' } }}>
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <HighlightedCode
                    copyButtonHidden
                    component={MarkdownElement}
                    code={``}
                    language="jsx"
                  />
                </Box>
              </Box>
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
