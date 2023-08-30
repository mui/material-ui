import * as React from 'react';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import SvgMaterialDesign from 'docs/src/icons/SvgMaterialDesign';
import Frame from 'docs/src/components/action/Frame';
import PlayerCard from 'docs/src/components/showcase/PlayerCard';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';

const code = `
<Card
  variant="outlined"
  sx={{
    p: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  }}
>
  <CardMedia
    component="img"
    width="100"
    height="100"
    alt="Birds of Tokyo album cover"
    src="/static/images/cards/birds-of-tokyo.jpg"
    sx={{
      borderRadius: 0.6,
      height: 100,
      width: 100,
    }}
  />
  <Stack direction="column" spacing={2} alignItems="center">
    <Stack direction="column" spacing={0.2} alignItems="center">
      <Typography color="text.primary" fontWeight="medium" fontSize={15}>
        If This Ship Sinks (I Give In)
      </Typography>
      <Typography
        component="div"
        variant="caption"
        color="text.secondary"
        fontWeight="regular"
      >
        Birds Of Tokyo
      </Typography>
    </Stack>
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <IconButton aria-label="shuffle" disabled size="small" sx={{ flexGrow: 0 }}>
        <ShuffleRoundedIcon fontSize="small" />
      </IconButton>
      <IconButton aria-label="fast rewind" disabled size="small">
        <FastRewindRounded fontSize="small" />
      </IconButton>
      <IconButton
        aria-label={paused ? 'play' : 'pause'}
        sx={{ mx: 1 }}
        onClick={() => setPaused((val) => !val)}
      >
        {paused ? <PlayArrowRounded /> : <PauseRounded />}
      </IconButton>
      <IconButton aria-label="fast forward" disabled size="small">
        <FastForwardRounded fontSize="small" />
      </IconButton>
      <IconButton aria-label="loop" disabled size="small">
        <LoopRoundedIcon fontSize="small" />
      </IconButton>
    </Stack>
  </Stack>
</Card>`;

export default function MaterialTheming() {
  const [customized, setCustomized] = React.useState(true);
  return (
    <Section>
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box sx={{ maxWidth: 500 }}>
            <SectionHeadline
              overline="Theming"
              title={
                <Typography variant="h2">
                  Build <GradientText>your design system</GradientText> just as you want it to be
                </Typography>
              }
              description="Start quickly with Material Design or use the advanced theming feature to easily tailor the components to your needs."
            />
          </Box>
          <Group sx={{ mt: 4, pb: { xs: 0, md: 2 } }}>
            <Highlighter disableBorder selected={customized} onClick={() => setCustomized(true)}>
              <Item
                icon={<AutoAwesomeRounded color="warning" />}
                title="Custom Theme"
                description="Theming allows you to use your brand's design tokens, easily making the components reflect its look and feel."
              />
            </Highlighter>
            <Highlighter disableBorder selected={!customized} onClick={() => setCustomized(false)}>
              <Item
                icon={<SvgMaterialDesign />}
                title="Material Design"
                description="Every component comes with Google's tried and tested design system ready for use."
              />
            </Highlighter>
          </Group>
        </Grid>
        <Grid item xs={12} md={6}>
          <Frame sx={{ height: '100%' }}>
            <Frame.Demo
              sx={{
                p: 2,
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 188,
              }}
            >
              {customized ? (
                <PlayerCard horizontal extraStyles />
              ) : (
                <CssVarsProvider>
                  <PlayerCard horizontal disableTheming />
                </CssVarsProvider>
              )}
            </Frame.Demo>
            <Frame.Info sx={{ maxHeight: 300, overflow: 'auto' }}>
              <HighlightedCode
                copyButtonHidden
                component={MarkdownElement}
                code={code}
                language="jsx"
              />
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
