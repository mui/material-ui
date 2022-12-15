import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';
import Frame from 'docs/src/components/action/Frame';
import RealEstateCard from 'docs/src/components/showcase/RealEstateCard';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';
import DragHandleRounded from '@mui/icons-material/DragHandleRounded';
import FlashCode from 'docs/src/components/animation/FlashCode';

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

const startLine = [32, 25, 5];
const endLine = [44, 30, 8];
const scrollTo = [540, 320, 0];

const useResizeHandle = (
  target: React.MutableRefObject<HTMLDivElement | null>,
  options?: { minWidth?: string; maxWidth?: string },
) => {
  const { minWidth = '0px', maxWidth = '100%' } = options || {};
  const [dragging, setDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState(0);
  const isTouchEvent = (event: MouseEvent | TouchEvent): event is TouchEvent => {
    return Boolean((event as TouchEvent).touches && (event as TouchEvent).touches.length);
  };
  const isMouseEvent = (event: MouseEvent | TouchEvent): event is MouseEvent => {
    return Boolean((event as MouseEvent).clientX || (event as MouseEvent).clientX === 0);
  };
  const getClientX = React.useCallback((event: MouseEvent | TouchEvent) => {
    let clientX;
    if (isMouseEvent(event)) {
      clientX = event.clientX;
    }
    if (isTouchEvent(event)) {
      clientX = event.touches[0].clientX;
    }
    return clientX as number;
  }, []);
  const handleStart = (event: React.MouseEvent | React.TouchEvent) => {
    const clientX = getClientX(event.nativeEvent);
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setDragging(true);
    setDragOffset(rect.width - (clientX - rect.x));
  };
  React.useEffect(() => {
    function resizeObject(event: MouseEvent | TouchEvent) {
      if (event.cancelable) {
        event.preventDefault();
      }
      const clientX = getClientX(event);

      if (target.current && dragging && clientX) {
        const objectRect = target.current.getBoundingClientRect();
        const newWidth = clientX - objectRect.left + dragOffset;
        target.current.style.width = `clamp(${minWidth}, ${Math.floor(newWidth)}px, ${maxWidth})`;
      }
    }
    function stopResize() {
      setDragging(false);
    }

    if (dragging) {
      document.addEventListener('mousemove', resizeObject, { passive: false });
      document.addEventListener('mouseup', stopResize);
      document.addEventListener('touchmove', resizeObject, { passive: false });
      document.addEventListener('touchend', stopResize);
      return () => {
        document.removeEventListener('mousemove', resizeObject);
        document.removeEventListener('mouseup', stopResize);
        document.removeEventListener('touchmove', resizeObject);
        document.removeEventListener('touchend', stopResize);
      };
    }
    return () => {};
  }, [dragOffset, dragging, getClientX, maxWidth, minWidth, target]);
  return {
    dragging,
    getDragHandlers: () => ({
      onTouchStart: handleStart,
      onMouseDown: handleStart,
    }),
  };
};

export default function CoreStyling() {
  const [index, setIndex] = React.useState(0);
  const objectRef = React.useRef<HTMLDivElement | null>(null);
  const { dragging, getDragHandlers } = useResizeHandle(objectRef, { minWidth: '253px' });
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
                  Rapidly add and tweak any styles using <GradientText>CSS utilities</GradientText>
                </Typography>
              }
              description="CSS utilities allow you to move faster and make for a smooth developer experience when styling any component."
            />
          </Box>
          <Group sx={{ mt: 4, pb: { xs: 0, md: 2 } }}>
            <Highlighter disableBorder {...getSelectedProps(0)} onClick={() => setIndex(0)}>
              <Item
                icon={<AutoAwesomeRounded color="warning" />}
                title="Leverage the tokens from your theme"
                description="Easily use the design tokens defined in your theme for any CSS property out there."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(1)} onClick={() => setIndex(1)}>
              <Item
                icon={<AutoAwesomeRounded color="warning" />}
                title="No context switching"
                description="The styling and component usage are both in the same place, right where you need them."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(2)} onClick={() => setIndex(2)}>
              <Item
                icon={<AutoAwesomeRounded color="warning" />}
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
                overflow: 'auto',
              }}
            >
              <Box
                ref={objectRef}
                style={{ touchAction: dragging ? 'none' : 'auto' }}
                sx={(theme) => ({
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  p: 2,
                  pr: 3,
                  minHeight: index === 2 ? 280 : 'initial',
                  bgcolor: 'grey.100',
                  ...theme.applyDarkStyles({
                    bgcolor: 'primaryDark.700',
                  }),
                })}
              >
                {index === 2 && (
                  <React.Fragment>
                    <Box
                      sx={[
                        {
                          cursor: 'col-resize',
                          display: 'flex',
                          alignItems: 'center',
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          height: '100%',
                          color: 'grey.600',
                          '&:hover': {
                            color: 'grey.700',
                          },
                        },
                        (theme) =>
                          theme.applyDarkStyles({
                            color: 'grey.500',
                            '&:hover': {
                              color: 'grey.300',
                            },
                          }),
                      ]}
                      {...getDragHandlers()}
                    >
                      <DragHandleRounded sx={{ transform: 'rotate(90deg)' }} />
                    </Box>
                    <Box
                      sx={(theme) => ({
                        pointerEvents: 'none',
                        width: '1px',
                        bgcolor: 'grey.400',
                        position: 'absolute',
                        left: 345,
                        height: '100%',
                        ...theme.applyDarkStyles({
                          bgcolor: 'primaryDark.500',
                        }),
                      })}
                    >
                      <Box
                        sx={(theme) => ({
                          position: 'absolute',
                          bottom: 5,
                          typography: 'caption',
                          left: -30,
                          color: 'text.secondary',
                          borderRadius: '2px',
                          bgcolor: 'grey.300',
                          px: 0.5,
                          ...theme.applyDarkStyles({
                            bgcolor: 'grey.800',
                          }),
                        })}
                      >
                        xs
                      </Box>
                      <Box
                        sx={(theme) => ({
                          position: 'absolute',
                          bottom: 5,
                          typography: 'caption',
                          left: 7,
                          color: 'text.secondary',
                          borderRadius: '2px',
                          bgcolor: 'grey.300',
                          px: 0.5,
                          ...theme.applyDarkStyles({
                            bgcolor: 'grey.800',
                          }),
                        })}
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
              }}
            >
              <Box sx={{ position: 'relative', '&& pre': { bgcolor: 'transparent' } }}>
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <HighlightedCode
                    copyButtonHidden
                    component={MarkdownElement}
                    code={code}
                    language="jsx"
                  />
                </Box>
                <FlashCode startLine={startLine[index]} endLine={endLine[index]} sx={{ mx: -1 }} />
              </Box>
            </Frame.Info>
          </Frame>
        </Grid>
      </Grid>
    </Section>
  );
}
