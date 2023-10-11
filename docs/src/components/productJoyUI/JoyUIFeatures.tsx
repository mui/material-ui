import * as React from 'react';
// Material UI components for the page
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import JoyBox from '@mui/joy/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
// Joy UI components imports
import { ColorPaletteProp, VariantProp } from '@mui/joy/styles';
import JoyFormControl, { formControlClasses } from '@mui/joy/FormControl';
import JoyFormLabel from '@mui/joy/FormLabel';
import JoySlider, { sliderClasses as joySliderClasses } from '@mui/joy/Slider';
import JoyButton from '@mui/joy/Button';
import JoyCard from '@mui/joy/Card';
import JoySheet from '@mui/joy/Sheet';
import JoyChip from '@mui/joy/Chip';
import JoyIconButton from '@mui/joy/IconButton';
import JoyTypography from '@mui/joy/Typography';
import JoySwitch from '@mui/joy/Switch';
import JoyAvatar from '@mui/joy/Avatar';
import JoyAlert from '@mui/joy/Alert';
import JoyRadio, { radioClasses } from '@mui/joy/Radio';
import JoyRadioGroup from '@mui/joy/RadioGroup';
import JoyBreadcrumbs from '@mui/joy/Breadcrumbs';
import JoyLink from '@mui/joy/Link';
import JoyInput from '@mui/joy/Input';
import JoyTooltip from '@mui/joy/Tooltip';
// Icons
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import MailIcon from '@mui/icons-material/Mail';
// Website components
import Section from 'docs/src/layouts/Section';
import Highlighter from 'docs/src/components/action/Highlighter';
import Item, { Group } from 'docs/src/components/action/Item';
import GradientText from 'docs/src/components/typography/GradientText';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Frame from 'docs/src/components/action/Frame';
import MoreInfo from 'docs/src/components/action/MoreInfo';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';
import useResizeHandle from 'docs/src/modules/utils/useResizeHandle';

const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: 52,
  borderRadius: 40,
  padding: theme.spacing('1px', 1, '2px', 1),
  fontSize: theme.typography.pxToRem(12),
  lineHeight: 1.5,
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
          minHeight: { xs: 'auto', sm: 202 },
          p: { xs: 2, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <JoyCard sx={{ boxShadow: 'md', display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
            <div>
              <JoyBreadcrumbs aria-label="breadcrumbs" sx={{ p: 0 }}>
                {['MUI', 'Styled libraries'].map((item) => (
                  <JoyLink fontSize="sm" key={item} color="neutral" href="#basics">
                    {item}
                  </JoyLink>
                ))}
                <JoyTypography fontSize="sm" fontWeight="lg">
                  Joy UI
                </JoyTypography>
              </JoyBreadcrumbs>
              <Stack direction="row" alignItems="center" spacing={1} mt={1} mb={0.5}>
                <JoyTypography fontWeight="lg" textColor="text.primary">
                  Component variants
                </JoyTypography>
                <JoyChip variant={variant} color={color} size="sm">
                  Global
                </JoyChip>
              </Stack>
              <JoyTypography fontSize="sm">
                The styles of each variant in Joy UI is defined globally to ensure design
                consistency.
              </JoyTypography>
            </div>
            <JoySwitch variant={variant} color={color} />
          </Stack>
          <JoyRadioGroup
            aria-label="platform"
            defaultValue="Website"
            overlay
            name="platform"
            sx={{
              flexDirection: 'row',
              gap: 2,
              [`& .${radioClasses.checked}`]: {
                [`& .${radioClasses.action}`]: {
                  inset: -1,
                  border: '2px solid',
                  borderColor: `${color}`,
                },
              },
              [`& .${radioClasses.radio}`]: {
                display: 'contents',
                '& > svg': {
                  zIndex: 2,
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  bgcolor: 'background.surface',
                  borderRadius: '50%',
                },
              },
            }}
          >
            {['Website', 'Documents', 'Social Account'].map((value) => (
              <JoySheet
                key={value}
                variant={variant}
                color={color}
                invertedColors={variant === 'solid' || variant === 'soft'}
                sx={{
                  borderRadius: 'md',
                  boxShadow: 'sm',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1,
                  width: '100%',
                }}
              >
                <JoyRadio
                  variant={variant}
                  color={color}
                  id={value}
                  value={value}
                  checkedIcon={<CheckCircleRoundedIcon data-skip-inverted-colors color={color} />}
                />
                <JoyAvatar variant="soft" size="sm" />
                <JoyFormLabel htmlFor={value} sx={{ fontSize: 'xs' }}>
                  {value}
                </JoyFormLabel>
              </JoySheet>
            ))}
          </JoyRadioGroup>
          <JoyAlert
            variant={variant}
            color={color}
            startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
          >
            Your component library has been installed successfully!
          </JoyAlert>
          <JoyButton variant={variant} color={color} fullWidth>
            View all button
          </JoyButton>
        </JoyCard>
      </Frame.Demo>
      <Frame.Info
        data-mui-color-scheme="dark"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            justifyContent: 'space-between',
            mb: 0.5,
          }}
        >
          <Stack spacing={0.5} direction="row" useFlexGap>
            {(['plain', 'outlined', 'soft', 'solid'] as const).map((item) => (
              <StyledButton
                variant={item === variant ? 'outlined' : 'text'}
                key={item}
                onClick={() => setVariant(item)}
              >
                {item}
              </StyledButton>
            ))}
          </Stack>
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
        <Divider />
        <MoreInfo subject="global variants" link="/joy-ui/main-features/global-variants/" />
      </Frame.Info>
    </Frame>
  );
}

function CardDemo({ invertedColors }: { invertedColors?: boolean }) {
  const [bookmarked, setBookmarked] = React.useState(false);
  return (
    <JoyCard
      size="lg"
      variant="solid"
      color="primary"
      invertedColors={invertedColors}
      sx={{ gap: 2, maxWidth: 350, boxShadow: 'md' }}
    >
      <JoyChip
        size="sm"
        variant="soft"
        startDecorator={<AutoAwesomeRoundedIcon />}
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
      <JoyTypography level="h3">Learn how to build great-looking websites.</JoyTypography>
      <JoyButton variant="solid" endDecorator={<KeyboardArrowRightIcon />}>
        Get started
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
        <Frame.Info
          data-mui-color-scheme="dark"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            width: '100%',
            position: 'absolute',
            left: '50%',
            bottom: 0,
            transform: 'translateX(-50%)',
            lineHeight: 0,
            border: 0,
            '> pre': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <HighlightedCode
            copyButtonHidden
            component={MarkdownElement}
            code={`<Card variant="solid" color="primary">{...}</Card>`}
            language="jsx"
          />
          <Divider />
          <MoreInfo subject="color inversion" link="/joy-ui/main-features/color-inversion/" />
        </Frame.Info>
      </Frame.Demo>
      <Frame.Demo
        sx={{
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
        <Frame.Info
          data-mui-color-scheme="dark"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            width: '100%',
            position: 'absolute',
            left: '50%',
            bottom: 0,
            transform: 'translateX(-50%)',
            lineHeight: 0,
            border: 0,
            '> pre': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <HighlightedCode
            copyButtonHidden
            component={MarkdownElement}
            code={`<Card variant="solid" color="primary" invertedColors>{...}</Card>`}
            language="jsx"
          />
          <Divider />
          <MoreInfo subject="color inversion" link="/joy-ui/main-features/color-inversion/" />
        </Frame.Info>
      </Frame.Demo>
      <Box
        {...getDragHandlers()}
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 54,
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
            width: 42,
            height: 42,
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

function CSSvars() {
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
                width: Math.floor(Math.random() * (64 + 1)) + 24,
                height: Math.floor(Math.random() * (32 - 24 + 1)) + 24,
                radius: Math.floor(Math.random() * (20 - 0 + 1)) + 0,
              });
              setJoyThumb({
                width: Math.floor(Math.random() * (24 - 20 + 1)) + 12,
                size: Math.floor(Math.random() * (24 - 48 + 1)) + 32,
                radius: undefined,
              });
            }}
            sx={{ fontFamily: 'IBM Plex Sans' }}
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
            sx={{ fontFamily: 'IBM Plex Sans' }}
          >
            Reset
          </JoyButton>
        </Box>
        <Box sx={{ placeSelf: 'center', py: { xs: 4, sm: 0 } }}>
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
          <div>
            <JoyTypography level="title-sm" fontWeight="xl" sx={{ fontFamily: 'IBM Plex Sans' }}>
              Track
            </JoyTypography>
            <JoyFormControl size="sm" orientation="horizontal">
              <JoyFormLabel sx={{ fontFamily: 'IBM Plex Sans' }}>Width: </JoyFormLabel>
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
              <JoyFormLabel sx={{ fontFamily: 'IBM Plex Sans' }}>Height: </JoyFormLabel>
              <JoySlider
                size="sm"
                value={joyTrack.height}
                min={16}
                max={64}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}px`}
                onChange={(_, value) => {
                  setJoyTrack((prev) => ({ ...prev, height: value as number }));
                }}
              />
            </JoyFormControl>
            <JoyFormControl size="sm" orientation="horizontal">
              <JoyFormLabel sx={{ fontFamily: 'IBM Plex Sans' }}>Radius: </JoyFormLabel>
              <JoySlider
                size="sm"
                value={joyTrack.radius}
                min={0}
                max={20}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}px`}
                onChange={(_, value) => {
                  setJoyTrack((prev) => ({ ...prev, radius: value as number }));
                }}
              />
            </JoyFormControl>
          </div>
          <div>
            <JoyTypography level="title-sm" fontWeight="xl" sx={{ fontFamily: 'IBM Plex Sans' }}>
              Thumb
            </JoyTypography>
            <JoyFormControl size="sm" orientation="horizontal">
              <JoyFormLabel sx={{ fontFamily: 'IBM Plex Sans' }}>Width: </JoyFormLabel>
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
              <JoyFormLabel sx={{ fontFamily: 'IBM Plex Sans' }}>Size: </JoyFormLabel>
              <JoySlider
                size="sm"
                value={joyThumb.size}
                min={12}
                max={48}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}px`}
                onChange={(_, value) => {
                  setJoyThumb((prev) => ({ ...prev, size: value as number }));
                }}
              />
            </JoyFormControl>
            <JoyFormControl size="sm" orientation="horizontal">
              <JoyFormLabel sx={{ fontFamily: 'IBM Plex Sans' }}>Radius: </JoyFormLabel>
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
          </div>
        </Box>
      </Frame.Demo>
      <Frame.Info
        data-mui-color-scheme="dark"
        sx={{
          minHeight: 220,
          maxHeight: 450,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          '> pre': {
            backgroundColor: 'transparent',
          },
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
        <Divider />
        <MoreInfo
          subject="Joy UI's CSS variables use"
          link="/joy-ui/customization/using-css-variables/"
        />
      </Frame.Info>
    </Frame>
  );
}

function AutomaticAdjustment() {
  const defaultStyles = {
    height: 44,
    padding: 12,
    radius: 6,
  };
  const [styles, setStyles] = React.useState(defaultStyles);
  const [changed, setChanged] = React.useState(false);
  return (
    <Frame sx={{ height: '100%', mt: { md: '192px' } }}>
      <Frame.Demo
        sx={{
          minHeight: { xs: 'auto', sm: 202 },
          p: { xs: 2, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box sx={{ minHeight: 100, display: 'grid', placeItems: 'center' }}>
          <JoyInput
            startDecorator={<MailIcon />}
            endDecorator={<JoyButton>Message</JoyButton>}
            placeholder="Type in here…"
            sx={{
              '--Input-minHeight': `${styles.height}px`,
              '--Input-radius': `${styles.radius}px`,
              '--Input-paddingInline': `${styles.padding}px`,
              '--Input-decoratorChildHeight': '36px',
            }}
          />
        </Box>
        <Box
          sx={{
            borderTop: 1,
            borderColor: 'divider',
            mt: 2,
            mx: { xs: -2, sm: -4 },
            mb: { xs: -2, sm: -4 },
            py: 2,
            px: 3,
            display: 'grid',
            gridTemplateColumns: 'max-content 1fr',
            [`& > .${formControlClasses.root}`]: {
              display: 'contents',
            },
          }}
        >
          <JoyTypography
            level="body-xs"
            textColor="text.icon"
            sx={{ mb: 1, fontWeight: 'lg', letterSpacing: '0.025em' }}
          >
            INPUT STYLE
          </JoyTypography>
          <JoyTooltip title="Reset" placement="top">
            <JoyIconButton
              onClick={() => {
                setStyles(defaultStyles);
                setChanged(false);
              }}
              sx={{
                '--IconButton-size': '26px',
                visibility: changed ? 'visible' : 'hidden',
                p: 0,
                placeSelf: 'flex-end',
                alignSelf: 'flex-start',
              }}
            >
              <RestartAltIcon />
            </JoyIconButton>
          </JoyTooltip>
          <JoyFormControl orientation="horizontal">
            <JoyFormLabel>Height:</JoyFormLabel>
            <JoySlider
              size="sm"
              value={styles.height}
              min={36}
              max={64}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}px`}
              onChange={(_, value) => {
                setStyles((prev) => ({ ...prev, height: value as number }));
                setChanged(true);
              }}
            />
          </JoyFormControl>
          <JoyFormControl orientation="horizontal">
            <JoyFormLabel>Radius:</JoyFormLabel>
            <JoySlider
              size="sm"
              value={styles.radius}
              min={0}
              max={40}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}px`}
              onChange={(_, value) => {
                setStyles((prev) => ({ ...prev, radius: value as number }));
                setChanged(true);
              }}
            />
          </JoyFormControl>
          <JoyFormControl orientation="horizontal">
            <JoyFormLabel>Padding Inline:</JoyFormLabel>
            <JoySlider
              size="sm"
              value={styles.padding}
              min={8}
              max={24}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}px`}
              onChange={(_, value) => {
                setStyles((prev) => ({ ...prev, padding: value as number }));
                setChanged(true);
              }}
            />
          </JoyFormControl>
        </Box>
      </Frame.Demo>
      <Frame.Info
        data-mui-color-scheme="dark"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          justifyContent: 'space-between',
        }}
      >
        <MoreInfo
          subject="automatic adjustment"
          link="/joy-ui/main-features/automatic-adjustment/"
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
    <Section bg="gradient">
      <Grid container spacing={2}>
        <Grid md={6} sx={{ minWidth: 0 }}>
          <SectionHeadline
            overline="Features"
            title={
              <Typography variant="h2">
                Powerful features to
                <br /> <GradientText>customize every element</GradientText>
              </Typography>
            }
            description="Joy UI is built to ensure you ship great products to your users with an amazing developer experience."
          />
          <Group sx={{ mt: 3 }}>
            <Highlighter disableBorder {...getSelectedProps(0)} onClick={() => setIndex(0)}>
              <Item
                icon={<AutoAwesomeRoundedIcon color="warning" />}
                title="Global variants"
                description="Components pull their styles from a single source, helping you to ensure a consistent look and feel."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(1)} onClick={() => setIndex(1)}>
              <Item
                icon={<AutoAwesomeRoundedIcon color="warning" />}
                title="Color inversion"
                description="With color inversion set on the parent component, its children with implicit color will invert they styles to have a matching design."
              />
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(2)} onClick={() => setIndex(2)}>
              <Item
                icon={<AutoAwesomeRoundedIcon color="warning" />}
                title="CSS variables"
                description="Every Joy UI component is filled with custom CSS variables for fine-tune adjustments, saving you time for micro tweaks."
              />
              {/* To update/improve the copy above */}
            </Highlighter>
            <Highlighter disableBorder {...getSelectedProps(3)} onClick={() => setIndex(3)}>
              <Item
                icon={<AutoAwesomeRoundedIcon color="warning" />}
                title="Automatic adjustment"
                description="Every Joy UI component is filled with custom CSS variables for fine-tune adjustments, saving you time for micro tweaks."
              />
              {/* To update/improve the copy above */}
            </Highlighter>
          </Group>
        </Grid>
        <Grid xs={12} md={6}>
          {index === 0 && <GlobalVariantDemo />}
          {index === 1 && <ColorInversionDemo />}
          {index === 2 && <CSSvars />}
          {index === 3 && <AutomaticAdjustment />}
        </Grid>
      </Grid>
    </Section>
  );
}
