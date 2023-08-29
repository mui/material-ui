import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import JoyBox from '@mui/joy/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { ColorPaletteProp, VariantProp } from '@mui/joy/styles';
import JoyFormControl from '@mui/joy/FormControl';
import JoyFormLabel from '@mui/joy/FormLabel';
import JoySlider, { sliderClasses as joySliderClasses } from '@mui/joy/Slider';
import JoySelect from '@mui/joy/Select';
import JoyOption from '@mui/joy/Option';
import JoySvgIcon from '@mui/joy/SvgIcon';
import JoyButton from '@mui/joy/Button';
import JoyCard from '@mui/joy/Card';
import JoyChip from '@mui/joy/Chip';
import JoyIconButton from '@mui/joy/IconButton';
import JoyTypography from '@mui/joy/Typography';
import JoySwitch from '@mui/joy/Switch';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import SvgTwinkle from 'docs/src/icons/SvgTwinkle';
import Section from 'docs/src/layouts/Section';
import Highlighter from 'docs/src/components/action/Highlighter';
import Item, { Group } from 'docs/src/components/action/Item';
import GradientText from 'docs/src/components/typography/GradientText';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Frame from 'docs/src/components/action/Frame';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';
import useResizeHandle from 'docs/src/modules/utils/useResizeHandle';

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: 48,
  borderRadius: 40,
  padding: theme.spacing('2px', 1),
  fontSize: theme.typography.pxToRem(12),
  lineHeight: 18 / 12,
  '&.MuiButton-text': {
    color: theme.palette.grey[500],
    border: '1px solid',
    borderColor: theme.palette.primaryDark[700],
    '&:hover': {
      backgroundColor: theme.palette.primaryDark[700],
    },
  },
  '&.MuiButton-outlined': {
    color: '#fff',
    backgroundColor: theme.palette.primary[800],
    borderColor: theme.palette.primary[700],
    '&:hover': {
      backgroundColor: theme.palette.primary[700],
    },
  },
}));

function GlobalVariantDemo() {
  const [variant, setVariant] = React.useState<VariantProp>('outlined');
  const [color, setColor] = React.useState<ColorPaletteProp>('neutral');
  return (
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
        <JoyFormControl>
          <JoyFormLabel>Screen</JoyFormLabel>
          <JoySelect
            variant={variant}
            color={color}
            placeholder="Choose an option"
            defaultListboxOpen
            sx={{ minWidth: 200, mb: '64px' }}
            slotProps={{
              listbox: {
                sx: {
                  '& [role="option"]': {
                    gap: 1.5,
                  },
                },
              },
            }}
          >
            <JoyOption value="1">
              <JoySvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                </svg>
              </JoySvgIcon>
              Smartphone
            </JoyOption>
            <JoyOption value="2">
              <JoySvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="10" height="14" x="3" y="8" rx="2" />
                  <path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4" />
                  <path d="M8 18h.01" />
                </svg>
              </JoySvgIcon>
              Tablet
            </JoyOption>
            <JoyOption value="3">
              <JoySvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
                </svg>
              </JoySvgIcon>
              Laptop
            </JoyOption>
          </JoySelect>
        </JoyFormControl>
      </Frame.Demo>
      <Frame.Info
        data-mui-color-scheme="dark"
        sx={{
          maxHeight: 450,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {(['plain', 'outlined', 'soft', 'solid'] as const).map((item) => (
              <StyledButton
                variant={item === variant ? 'outlined' : 'text'}
                key={item}
                onClick={() => setVariant(item)}
              >
                {item}
              </StyledButton>
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 1, '& > button': { minWidth: 'initial' } }}>
            {(['primary', 'neutral', 'danger', 'warning', 'success'] as const).map((item) => (
              <StyledButton
                aria-label={`${item} color`}
                variant={item === color ? 'outlined' : 'text'}
                key={item}
                onClick={() => setColor(item)}
                sx={{ p: '5px' }}
              >
                <JoyBox
                  sx={{
                    borderRadius: '50%',
                    width: 12,
                    height: 12,
                    bgcolor: `${item}.solidBg`,
                    border: '1px solid',
                    borderColor: item === color ? 'rgba(255 255 255 / 0.6)' : 'transparent',
                  }}
                />
              </StyledButton>
            ))}
          </Box>
        </Box>
        <HighlightedCode
          copyButtonHidden
          component={MarkdownElement}
          code={`<Select
  placeholder="Select an option"
  color="neutral"
  variant="outlined"
>
  <Option value="option1">Option 1</Option>
  …
</Select>`}
          language="jsx"
        />
      </Frame.Info>
    </Frame>
  );
}

function CardDemo({ invertedColors }: { invertedColors?: boolean }) {
  const [bookmarked, setBookmarked] = React.useState(false);
  return (
    <JoyCard
      variant="solid"
      color="primary"
      invertedColors={invertedColors}
      sx={{ gap: 2, maxWidth: 300, boxShadow: 'md' }}
    >
      <JoyChip
        size="sm"
        variant="soft"
        startDecorator={
          <JoySvgIcon>
            <path d="M19.46 8l.79-1.75L22 5.46a.5.5 0 000-.91l-1.75-.79L19.46 2a.5.5 0 00-.91 0l-.79 1.75-1.76.79a.5.5 0 000 .91l1.75.79.79 1.76c.18.39.74.39.92 0zM11.5 9.5L9.91 6c-.35-.78-1.47-.78-1.82 0L6.5 9.5 3 11.09c-.78.36-.78 1.47 0 1.82l3.5 1.59L8.09 18c.36.78 1.47.78 1.82 0l1.59-3.5 3.5-1.59c.78-.36.78-1.47 0-1.82L11.5 9.5zm7.04 6.5l-.79 1.75-1.75.79a.5.5 0 000 .91l1.75.79.79 1.76a.5.5 0 00.91 0l.79-1.75 1.76-.79a.5.5 0 000-.91l-1.75-.79-.79-1.76a.508.508 0 00-.92 0z" />
          </JoySvgIcon>
        }
        sx={{ alignSelf: 'flex-start', borderRadius: 'xl' }}
      >
        New
      </JoyChip>
      <JoyIconButton
        variant="plain"
        size="sm"
        onClick={() => setBookmarked(!bookmarked)}
        sx={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}
      >
        {bookmarked ? (
          <BookmarkBorderIcon />
        ) : (
          <BookmarkOutlinedIcon sx={{ color: 'primary.100' }} />
        )}
      </JoyIconButton>
      <JoyTypography level="h3">Learn how to build super fast websites.</JoyTypography>
      <JoyButton variant="solid" endDecorator={<KeyboardArrowRightIcon />}>
        Read more
      </JoyButton>
    </JoyCard>
  );
}

function ColorInversionDemo() {
  const objectRef = React.useRef<HTMLDivElement | null>(null);
  const handleDragging = React.useCallback(
    (target: React.MutableRefObject<HTMLDivElement>['current'], length: number) => {
      const rect = target.getBoundingClientRect();
      target.style.setProperty(
        '--split-point',
        `clamp(48px, ${((length * 100) / rect.width).toFixed(2)}%, calc(100% - 48px))`,
      );
    },
    [],
  );
  const { dragging, getDragHandlers } = useResizeHandle(objectRef, {
    onDragging: handleDragging,
  });
  return (
    <Frame
      ref={objectRef}
      style={{ touchAction: dragging ? 'none' : 'auto' }}
      sx={{
        height: '100%',
        minHeight: 400,
        position: 'relative',
        '--split-point': '50%',
        '& > *': {
          borderRadius: '12px',
        },
      }}
    >
      <Frame.Demo
        sx={{
          bgcolor: 'background.paper',
          overflow: 'auto',
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          clipPath: 'inset(0 calc(100% - var(--split-point)) 0 0)',
        }}
      >
        <CardDemo />
        <Box
          sx={{
            p: 2,
            borderRadius: '0.5rem',
            position: 'absolute',
            left: '50%',
            bottom: '1rem',
            transform: 'translateX(-50%)',
            bgcolor: 'common.black',
            lineHeight: 0,
          }}
        >
          <HighlightedCode
            copyButtonHidden
            component={MarkdownElement}
            code={`<Card variant="solid" color="primary">`}
            language="jsx"
          />
        </Box>
      </Frame.Demo>
      <Frame.Demo
        sx={{
          bgcolor: 'background.paper',
          overflow: 'auto',
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          clipPath: 'inset(0 0 0 var(--split-point))',
        }}
      >
        <CardDemo invertedColors />
        <Box
          sx={{
            p: 2,
            borderRadius: '0.5rem',
            position: 'absolute',
            left: '50%',
            bottom: '1rem',
            transform: 'translateX(-50%)',
            bgcolor: 'common.black',
            lineHeight: 0,
          }}
        >
          <HighlightedCode
            copyButtonHidden
            component={MarkdownElement}
            code={`<Card variant="solid" color="primary" invertedColors>`}
            language="jsx"
          />
        </Box>
      </Frame.Demo>
      <Box
        {...getDragHandlers()}
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: 20,
          left: 'var(--split-point)',
          transform: 'translateX(-50%)',
          cursor: 'col-resize',
        }}
      >
        <Box
          sx={{
            margin: '0 auto',
            width: 2,
            bgcolor: 'divider',
            height: '100%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            display: 'grid',
            placeItems: 'center',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%) rotate(90deg)',
          }}
        >
          <UnfoldMoreIcon />
        </Box>
      </Box>
    </Frame>
  );
}

function AutomaticAdjustment() {
  const defaultJoyTrack = {
    width: 48,
    height: 24,
    radius: 16,
  };
  const defaultJoyThumb = {
    width: 16,
    size: 16,
    radius: 8,
  };
  const [joyTrack, setJoyTrack] = React.useState<{
    width?: number;
    height?: number;
    radius?: number;
  }>(defaultJoyTrack);
  const [joyThumb, setJoyThumb] = React.useState<{
    width?: number;
    size?: number;
    radius?: number;
  }>(defaultJoyThumb);
  return (
    <Frame sx={{ height: '100%' }}>
      <Frame.Demo sx={{ flexGrow: 1, display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, pt: 1.5 }}>
          <JoyButton
            variant="plain"
            color="primary"
            size="sm"
            startDecorator={<AutoFixHighIcon />}
            onClick={() => {
              setJoyTrack({
                width: Math.floor(Math.random() * (48 - 64 + 1)) + 64,
                height: Math.floor(Math.random() * (32 - 24 + 1)) + 24,
                radius: Math.floor(Math.random() * (20 - 0 + 1)) + 0,
              });
              setJoyThumb({
                width: Math.floor(Math.random() * (24 - 20 + 1)) + 20,
                size: Math.floor(Math.random() * (24 - 48 + 1)) + 48,
                radius: undefined,
              });
            }}
          >
            Random
          </JoyButton>
          <JoyButton
            variant="plain"
            color="neutral"
            size="sm"
            startDecorator={<RestartAltIcon />}
            onClick={() => {
              setJoyTrack(defaultJoyTrack);
              setJoyThumb(defaultJoyThumb);
            }}
          >
            Reset
          </JoyButton>
        </Box>
        <Box sx={{ placeSelf: 'center' }}>
          <JoySwitch
            sx={{
              ...(joyTrack.width && { '--Switch-trackWidth': `${joyTrack.width}px` }),
              ...(joyTrack.height && { '--Switch-trackHeight': `${joyTrack.height}px` }),
              ...(joyTrack.radius && { '--Switch-trackRadius': `${joyTrack.radius}px` }),
              ...(joyThumb.width && { '--Switch-thumbWidth': `${joyThumb.width}px` }),
              ...(joyThumb.size && { '--Switch-thumbSize': `${joyThumb.size}px` }),
              ...(joyThumb.radius && { '--Switch-thumbRadius': `${joyThumb.radius}px` }),
            }}
          />
        </Box>
        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            px: 2,
            pt: 1.5,
            pb: 0.5,
            rowGap: 2,
            columnGap: 4,
            alignItems: 'flex-start',
            [`& label`]: {
              minWidth: 48,
            },
            [`& .${joySliderClasses.root}`]: {
              '--Slider-size': '36px',
            },
          }}
        >
          <Box>
            <JoyTypography level="title-sm" sx={{ mb: 0.5 }}>
              Track
            </JoyTypography>

            <JoyFormControl size="sm" orientation="horizontal">
              <JoyFormLabel>Width: </JoyFormLabel>
              <JoySlider
                size="sm"
                value={joyTrack.width}
                min={40}
                max={100}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}px`}
                onChange={(_, value) => {
                  setJoyTrack((prev) => ({ ...prev, width: value as number }));
                }}
              />
            </JoyFormControl>

            <JoyFormControl size="sm" orientation="horizontal">
              <JoyFormLabel>Height: </JoyFormLabel>
              <JoySlider
                size="sm"
                value={joyTrack.height}
                min={16}
                max={64}
                valueLabelDisplay="auto"
                onChange={(_, value) => {
                  setJoyTrack((prev) => ({ ...prev, height: value as number }));
                }}
              />
            </JoyFormControl>

            <JoyFormControl size="sm" orientation="horizontal">
              <JoyFormLabel>Radius: </JoyFormLabel>
              <JoySlider
                size="sm"
                value={joyTrack.radius}
                min={0}
                max={20}
                valueLabelDisplay="auto"
                onChange={(_, value) => {
                  setJoyTrack((prev) => ({ ...prev, radius: value as number }));
                }}
              />
            </JoyFormControl>
          </Box>

          <Box>
            <JoyTypography level="title-sm" sx={{ mb: 0.5 }}>
              Thumb
            </JoyTypography>
            <JoyFormControl size="sm" orientation="horizontal">
              <JoyFormLabel>Width: </JoyFormLabel>
              <JoySlider
                size="sm"
                value={joyThumb.width}
                min={12}
                max={48}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}px`}
                onChange={(_, value) => {
                  setJoyThumb((prev) => ({ ...prev, width: value as number }));
                }}
              />
            </JoyFormControl>

            <JoyFormControl size="sm" orientation="horizontal">
              <JoyFormLabel>Size: </JoyFormLabel>
              <JoySlider
                size="sm"
                value={joyThumb.size}
                min={12}
                max={48}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}px`}
                onChange={(_, value) => {
                  setJoyThumb((prev) => ({ ...prev, height: value as number }));
                }}
              />
            </JoyFormControl>

            <JoyFormControl size="sm" orientation="horizontal">
              <JoyFormLabel>Radius: </JoyFormLabel>
              <JoySlider
                size="sm"
                value={joyThumb.radius}
                min={2}
                max={24}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}px`}
                onChange={(_, value) => {
                  setJoyThumb((prev) => ({ ...prev, radius: value as number }));
                }}
              />
            </JoyFormControl>
          </Box>
        </Box>
      </Frame.Demo>
      <Frame.Info
        data-mui-color-scheme="dark"
        sx={{
          minHeight: 220,
          maxHeight: 450,
          overflow: 'auto',
        }}
      >
        <HighlightedCode
          copyButtonHidden
          component={MarkdownElement}
          code={`<Switch${
            Object.keys({ ...joyTrack, ...joyThumb }).length
              ? `
  sx={{${joyTrack.width ? `\n    '--Switch-trackWidth': '${joyTrack.width}px',` : ''}${
                  joyTrack.height ? `\n    '--Switch-trackHeight': '${joyTrack.height}px',` : ''
                }${joyTrack.radius ? `\n    '--Switch-trackRadius': '${joyTrack.radius}px',` : ''}${
                  joyThumb.width ? `\n    '--Switch-thumbWidth': '${joyThumb.width}px',` : ''
                }${joyThumb.size ? `\n    '--Switch-thumbSize': '${joyThumb.size}px',` : ''}${
                  joyThumb.radius ? `\n    '--Switch-thumbRadius': '${joyThumb.radius}px',` : ''
                }
  }}
/>`
              : ' />'
          }
            `}
          language="jsx"
        />
      </Frame.Info>
    </Frame>
  );
}

export default function JoyUIFeatures() {
  const [index, setIndex] = React.useState(0);
  function getSelectedProps(i: number) {
    return {
      selected: index === i,
      sx: { '& svg': { opacity: index === i ? 1 : 0.5 } },
    };
  }
  return (
    <Section>
      <Grid container spacing={2}>
        <Grid md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="Features"
              title={
                <Typography variant="h2">
                  Powerful <GradientText>features to customize</GradientText> every piece
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
                description="Pull their styles from a single source, helping you to ensure a consistent look and feel across both pre-built Joy UI components and any custom components you build."
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
        <Grid xs={12} md={6}>
          {index === 0 && <GlobalVariantDemo />}
          {index === 1 && <ColorInversionDemo />}
          {index === 2 && <AutomaticAdjustment />}
        </Grid>
      </Grid>
    </Section>
  );
}
