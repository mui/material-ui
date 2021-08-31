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
import DragHandleRounded from '@material-ui/icons/DragHandleRounded';

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

const code = `
<Card
  variant="outlined"
  sx={{
    display: 'flex',
    p: 1,
    flexDirection: {
      xs: 'column', // mobile
      sm: 'row', // tablet and up
    },
  }}
>
  <CardMedia
    component="img"
    width="100"
    height="100"
    alt="123 Main St, Phoenix, AZ cover"
    src="/static/images/cards/real-estate.png"
    sx={{
      borderRadius: 0.5,
      width: { xs: '100%', sm: 100 },
      mr: { sm: 1.5 },
      mb: { xs: 1.5, sm: 0 },
    }}
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
        typography: 'caption',
        bgcolor: (theme) => 
          theme.palette.mode === 'dark' ? 'primary.900' : 'primary.50',
        color: (theme) => 
          theme.palette.mode === 'dark' ? '#fff' : 'primary.700',
      }}
    >
      <InfoRounded sx={{ fontSize: 16, mr: 0.5, mt: '1px' }} />
      Confidence score of 85%
    </Box>
  </Box>
</Card>`;

const isTouchEvent = (event: MouseEvent | TouchEvent): event is TouchEvent => {
  return Boolean((event as TouchEvent).touches && (event as TouchEvent).touches.length);
};

const isMouseEvent = (event: MouseEvent | TouchEvent): event is MouseEvent => {
  return Boolean((event as MouseEvent).clientX || (event as MouseEvent).clientX === 0);
};

const startLine = [33, 26, 6];
const endLine = [45, 31, 9];
const scrollTo = [540, 320, 0];

export default function CoreStyling() {
  const [index, setIndex] = React.useState(0);
  const [dragging, setDragging] = React.useState<false | number>(false);
  const objectRef = React.useRef<HTMLDivElement | null>(null);
  const infoRef = React.useRef<HTMLDivElement | null>(null);
  function getSelectedProps(i: number) {
    return {
      selected: index === i,
      sx: { '& svg': { opacity: index === i ? 1 : 0.5 } },
    };
  }
  React.useEffect(() => {
    if (infoRef.current) {
      infoRef.current.scroll({ top: scrollTo[index], behavior: 'smooth' });
    }
    if (objectRef.current) {
      objectRef.current.style.width = '100%';
    }
  }, [index, scrollTo]);
  React.useEffect(() => {
    function resizeObject(event: MouseEvent | TouchEvent) {
      let clientX;
      if (isMouseEvent(event)) {
        event.preventDefault();
        clientX = event.clientX;
      }
      if (isTouchEvent(event)) {
        clientX = event.touches[0].clientX;
      }

      if (objectRef.current && typeof dragging === 'number' && clientX) {
        const objectRect = objectRef.current.getBoundingClientRect();
        const newWidth = clientX - objectRect.left + dragging;
        objectRef.current.style.width = `clamp(253px, ${Math.floor(newWidth)}px, 100%)`;
      }
    }
    function stopResize() {
      setDragging(false);
    }

    if (typeof dragging === 'number') {
      document.addEventListener('mousemove', resizeObject);
      document.addEventListener('mouseup', stopResize);
      document.addEventListener('touchmove', resizeObject);
      document.addEventListener('touchup', stopResize);
      return () => {
        document.removeEventListener('mousemove', resizeObject);
        document.removeEventListener('mouseup', stopResize);
        document.addEventListener('touchmove', resizeObject);
        document.addEventListener('touchup', stopResize);
      };
    }
  }, [dragging]);
  return (
    <Section bg="gradient">
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="Styling"
              title={
                <Typography variant="h2">
                  Rapidly add and tweak any styles using{' '}
                  <GradientText>CSS utilities</GradientText>
                </Typography>
              }
              description="CSS utilities allow you to move faster and make for a smooth developer experience when styling any component."
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
                title="Responsive styles right inside system prop"
                description="An elegant API for writing CSS media queries that match your theme breakpoints."
              />
            </Highlighter>
          </Group>
        </Grid>
        <Grid item xs={12} md={6}>
          <Frame sx={{ height: '100%' }}>
            <Frame.Demo
              sx={{
                bgcolor: 'background.paper',
              }}
            >
              <Box
                ref={objectRef}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  p: 2,
                  pr: 3,
                  minHeight: index === 2 ? 280 : 'initial',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.100',
                }}
              >
                {index === 2 && (
                  <React.Fragment>
                    <Box
                      sx={{
                        cursor: 'col-resize',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        height: '100%',
                        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.500' : 'grey.600'),
                        '&:hover': {
                          color: (theme) =>
                            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.700',
                        },
                      }}
                      onMouseDown={(event) => {
                        const rect = (event.target as HTMLElement).getBoundingClientRect();
                        setDragging(rect.width - (event.clientX - rect.x));
                      }}
                      onTouchStart={(event) => {
                        const rect = (event.target as HTMLElement).getBoundingClientRect();
                        setDragging(rect.width - (event.touches[0].clientX - rect.x));
                      }}
                    >
                      <DragHandleRounded sx={{ transform: 'rotate(90deg)' }} />
                    </Box>
                    <Box
                      sx={{
                        width: '1px',
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark' ? 'primaryDark.500' : 'grey.400',
                        position: 'absolute',
                        left: 345,
                        height: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 5,
                          typography: 'caption',
                          left: -30,
                          color: 'text.secondary',
                          borderRadius: '2px',
                          bgcolor: (theme) =>
                            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                          px: 0.5,
                        }}
                      >
                        xs
                      </Box>
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 5,
                          typography: 'caption',
                          left: 7,
                          color: 'text.secondary',
                          borderRadius: '2px',
                          bgcolor: (theme) =>
                            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                          px: 0.5,
                        }}
                      >
                        sm
                      </Box>
                    </Box>
                  </React.Fragment>
                )}
                <RealEstateCard sx={{ width: '100%', maxWidth: 343 }} />
              </Box>
            </Frame.Demo>
            <Frame.Info
              ref={infoRef}
              sx={{
                maxHeight: index === 2 ? 282 : 400,
                overflow: 'auto',
                position: 'relative',
              }}
            >
              <Box sx={{ zIndex: 1, position: 'relative', '&& pre': { bgcolor: 'transparent' } }}>
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
