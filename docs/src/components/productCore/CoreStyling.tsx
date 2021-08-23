import * as React from 'react';
import { styled, alpha } from '@material-ui/core/styles';
import { shouldForwardProp } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import SvgTwinkle from 'docs/src/icons/SvgTwinkle';
import Frame from 'docs/src/components/action/Frame';
import RealEstateCard from 'docs/src/components/showcase/RealEstateCard';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';

const FlashCode = styled('div', {
  shouldForwardProp: (prop) =>
    shouldForwardProp(prop) && prop !== 'endLine' && prop !== 'startLine',
})<{ endLine?: number; startLine?: number }>(({ theme, startLine = 0, endLine = 1 }) => ({
  borderRadius: 2,
  pointerEvents: 'none',
  position: 'absolute',
  left: 0,
  right: 0,
  top: startLine * 18 + 2,
  height: (endLine - startLine + 1) * 18,
  transition: '0.3s',
  ...theme.typography.caption,
  backgroundColor: alpha(theme.palette.primary.main, 0.2),
  border: '1px solid',
  borderColor: theme.palette.primary.dark,
}));

const code = `<Card variant="outlined" sx={{ display: 'flex', p: 1 }}>
  <CardMedia
    component="img"
    width="146"
    height="100"
    alt="123 Main St, Phoenix, AZ cover"
    src="/static/images/cards/real-estate.png"
    sx={{ width: 146, borderRadius: 0.5 }}
  />
  <Box sx={{ alignSelf: 'center', ml: 2 }}>
    <Typography variant="body2" color="text.secondary">
      123 Main St, Phoenix, AZ
    </Typography>
    <Typography component="div" fontWeight="bold">
      $280k - $310k
    </Typography>
    <Box
      sx={{
        ml: -1,
        mt: 0.75,
        px: 1,
        py: 0.5,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        typography: 'caption',
        bgcolor: (theme) => 
          theme.palette.mode === 'dark' ? 'primary.900' : 'primary.50',
        color: (theme) => 
          theme.palette.mode === 'dark' ? '#fff' : 'primary.700',
      }}
    >
      <InfoRounded sx={{ fontSize: 16, mr: 0.5 }} />
      Confidence score of 85%
    </Box>
  </Box>
</Card>`;

export default function CoreStyling() {
  const [index, setIndex] = React.useState(0);
  const infoRef = React.useRef<HTMLDivElement | null>(null);
  const startLine = [18, 11, 1];
  const endLine = [31, 13, 1];
  function getSelectedProps(i: number) {
    return {
      selected: index === i,
      sx: { '& svg': { opacity: index === i ? 1 : 0.5 } },
    };
  }
  React.useEffect(() => {
    if (infoRef.current) {
      infoRef.current.scroll({ top: index === 0 ? 273 : 0, behavior: 'smooth' });
    }
  }, [index]);
  return (
    <Section bg="gradient">
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="Styling"
              title={
                <Typography variant="h2">
                  Quickly design as you want it to be with{' '}
                  <GradientText>CSS utilities</GradientText>
                </Typography>
              }
              description="Want to customize the components down to the smallest detail? We provide built-in CSS utilities for rapid styling."
            />
          </Box>
          <Group sx={{ mt: 4, pb: { xs: 0, md: 2 } }}>
            <Highlighter disableBorder {...getSelectedProps(0)} onClick={() => setIndex(0)}>
              <Item
                icon={<SvgTwinkle />}
                title="Leverage the tokens from your theme"
                description="Easily use the design tokens defined in your theme for any CSS property out there."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(1)} onClick={() => setIndex(1)}>
              <Item
                icon={<SvgTwinkle />}
                title="No context switching"
                description="The styling and component usage are both in the same place, right where you need them."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(2)} onClick={() => setIndex(2)}>
              <Item
                icon={<SvgTwinkle />}
                title="Take care of your consistency game"
                description="Even when customizing, you can still maintain consistency constrained by the theme's design tokens."
              />
            </Highlighter>
          </Group>
        </Grid>
        <Grid item xs={12} md={6}>
          <Frame sx={{ height: '100%' }}>
            <Frame.Demo
              sx={{
                py: 2,
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <RealEstateCard />
            </Frame.Demo>
            <Frame.Info
              ref={infoRef}
              sx={{ maxHeight: 400, overflow: 'auto', position: 'relative' }}
            >
              <Box sx={{ zIndex: 1, position: 'relative', '& pre': { bgcolor: 'transparent' } }}>
                <HighlightedCode component={MarkdownElement} code={code} language="jsx" />
              </Box>
              <FlashCode startLine={startLine[index]} endLine={endLine[index]} sx={{ mx: 1 }} />
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
