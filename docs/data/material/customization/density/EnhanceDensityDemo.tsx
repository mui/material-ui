import * as React from 'react';
import { createTheme, enhanceDensity, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button, { buttonClasses } from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AddIcon from '@mui/icons-material/Add';

const colorSchemes = { light: true, dark: true };

const defaultTheme = createTheme({ colorSchemes });
const densityTheme = enhanceDensity(createTheme({ colorSchemes }));

// Below this the canvas scrolls. Kept under the card's inner width so the
// stage never overflows it — that would shift the button off centre.
const STAGE_WIDTH = 520;
const STAGE_HEIGHT = 240;

// The colors browser devtools use when it highlights a box.
const PADDING_COLOR = '#c3e5a5';
const PADDING_LINE = '#7ba85a';
const GAP_COLOR = '#9b6cd9';

interface Edges {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface Metrics {
  x: number;
  y: number;
  width: number;
  height: number;
  border: Edges;
  padding: Edges;
  iconX: number;
  iconY: number;
  iconSize: number;
  gapX: number;
  gap: number;
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const round = (value: number) => `${Math.round(value * 10) / 10}px`;

const path = (rect: Rect) =>
  `M${rect.x},${rect.y}H${rect.x + rect.width}V${rect.y + rect.height}H${rect.x}Z`;

const inset = (rect: Rect, edges: Edges): Rect => ({
  x: rect.x + edges.left,
  y: rect.y + edges.top,
  width: rect.width - edges.left - edges.right,
  height: rect.height - edges.top - edges.bottom,
});

// With the enhancer on, every dimension is a value you can name; with it off
// they are the component's own built-in numbers.
const tokens = {
  gap: "spacing('x-small')",
  icon: '0.8lh',
  // Only the box and its padding step up with the size prop.
  bySize: {
    small: {
      height: 'touch-target - x-small',
      padding: "spacing('small')",
    },
    medium: { height: 'touch-target', padding: "spacing('medium')" },
    large: {
      height: 'touch-target + small',
      padding: "spacing('large')",
    },
  },
};

type Size = keyof typeof tokens.bySize;

const SIZES = Object.keys(tokens.bySize) as Size[];

function Annotations({
  metrics,
  enhanced,
  size,
}: {
  metrics: Metrics;
  enhanced: boolean;
  size: Size;
}) {
  const hatchId = React.useId();
  const { x, y, width, height } = metrics;
  const right = x + width;
  const bottom = y + height;
  const paddingBox = inset(metrics, metrics.border);
  const contentBox = inset(paddingBox, metrics.padding);

  const iconCenter = {
    x: metrics.iconX + metrics.iconSize / 2,
    y: metrics.iconY + metrics.iconSize / 2,
  };
  const gapCenter = {
    x: metrics.gapX + metrics.gap / 2,
    y: contentBox.y + contentBox.height / 2,
  };
  const padCenter = {
    x: paddingBox.x + paddingBox.width - metrics.padding.right / 2,
    y: paddingBox.y + paddingBox.height / 2,
  };
  const padLabelY = bottom + 42;

  const caption = (token: string, value: number) =>
    enhanced ? `${token} (${round(value)})` : round(value);

  return (
    <Box
      component="svg"
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'visible',
        pointerEvents: 'none',
        color: 'text.secondary',
        fontSize: 13,
        '& text': { fill: 'currentColor' },
        '& .dim': { stroke: 'currentColor', fill: 'none' },
        '& .leader': {
          stroke: 'currentColor',
          fill: 'none',
          strokeDasharray: '3 3',
          opacity: 0.6,
        },
        '& .padding-box': {
          fill: PADDING_COLOR,
          fillOpacity: 0.7,
          stroke: PADDING_LINE,
          strokeDasharray: '2 2',
        },
        '& .icon-box': {
          fill: 'none',
          stroke: 'currentColor',
          strokeDasharray: '2 2',
          opacity: 0.6,
        },
        '& .gap-box': { stroke: GAP_COLOR, strokeDasharray: '2 2' },
        '& .hatch': { stroke: GAP_COLOR, opacity: 0.55 },
      }}
    >
      <defs>
        <pattern
          id={hatchId}
          width={6}
          height={6}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line className="hatch" x1={0} y1={0} x2={0} y2={6} strokeWidth={3} />
        </pattern>
      </defs>

      {/* The padding ring, the way devtools paints it: the padding box with the
          content box punched out. */}
      <path
        className="padding-box"
        fillRule="evenodd"
        d={`${path(paddingBox)}${path(contentBox)}`}
      />

      {/* The gap between the icon and the label. */}
      <rect
        className="gap-box"
        fill={`url(#${hatchId})`}
        x={metrics.gapX}
        y={contentBox.y}
        width={metrics.gap}
        height={contentBox.height}
      />

      <rect
        className="icon-box"
        x={metrics.iconX}
        y={metrics.iconY}
        width={metrics.iconSize}
        height={metrics.iconSize}
      />

      <line
        className="leader"
        x1={x + width / 2}
        y1={padLabelY - 10}
        x2={padCenter.x}
        y2={padCenter.y}
      />
      <text x={x + width / 2} y={padLabelY} textAnchor="middle">
        {caption(tokens.bySize[size].padding, metrics.padding.left)}
      </text>

      <line
        className="leader"
        x1={gapCenter.x}
        y1={y - 26}
        x2={gapCenter.x}
        y2={gapCenter.y}
      />
      <text x={gapCenter.x} y={y - 32} textAnchor="middle">
        {caption(tokens.gap, metrics.gap)}
      </text>

      <line
        className="leader"
        x1={x - 30}
        y1={iconCenter.y}
        x2={iconCenter.x}
        y2={iconCenter.y}
      />
      <text x={x - 36} y={iconCenter.y} textAnchor="end" dominantBaseline="middle">
        {caption(tokens.icon, metrics.iconSize)}
      </text>

      {/* Height is only a value the theme sets once the enhancer runs — without
          it the box is whatever the padding and line height add up to. */}
      {enhanced ? (
        <React.Fragment>
          <line className="dim" x1={right + 14} y1={y} x2={right + 14} y2={bottom} />
          <line className="dim" x1={right + 10} y1={y} x2={right + 18} y2={y} />
          <line
            className="dim"
            x1={right + 10}
            y1={bottom}
            x2={right + 18}
            y2={bottom}
          />
          <text x={right + 24} y={y + height / 2} dominantBaseline="middle">
            {caption(tokens.bySize[size].height, height)}
          </text>
        </React.Fragment>
      ) : null}
    </Box>
  );
}

export default function EnhanceDensityDemo() {
  const [enhanced, setEnhanced] = React.useState(true);
  const [size, setSize] = React.useState<Size>('medium');
  const [metrics, setMetrics] = React.useState<Metrics | null>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const labelRef = React.useRef<HTMLSpanElement>(null);

  // Read every number off the rendered button so the annotations can never
  // drift from what the theme actually emits.
  React.useEffect(() => {
    const stage = stageRef.current;
    const button = buttonRef.current;
    const label = labelRef.current;
    if (!stage || !button || !label) {
      return undefined;
    }
    const measure = () => {
      const icon = button.querySelector(`.${buttonClasses.startIcon} svg`);
      if (!icon) {
        return;
      }
      const stageBox = stage.getBoundingClientRect();
      const buttonBox = button.getBoundingClientRect();
      const iconBox = icon.getBoundingClientRect();
      const labelBox = label.getBoundingClientRect();
      const styles = window.getComputedStyle(button);
      const edges = (prefix: string, suffix: string): Edges => ({
        top: parseFloat(styles[`${prefix}Top${suffix}` as any]),
        right: parseFloat(styles[`${prefix}Right${suffix}` as any]),
        bottom: parseFloat(styles[`${prefix}Bottom${suffix}` as any]),
        left: parseFloat(styles[`${prefix}Left${suffix}` as any]),
      });
      setMetrics({
        x: buttonBox.left - stageBox.left,
        y: buttonBox.top - stageBox.top,
        width: buttonBox.width,
        height: buttonBox.height,
        border: edges('border', 'Width'),
        padding: edges('padding', ''),
        iconX: iconBox.left - stageBox.left,
        iconY: iconBox.top - stageBox.top,
        iconSize: iconBox.width,
        gapX: iconBox.right - stageBox.left,
        gap: labelBox.left - iconBox.right,
      });
    };
    measure();
    // A late webfont changes the label box without changing the button box.
    document.fonts?.ready.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(button);
    return () => observer.disconnect();
  }, [enhanced, size]);

  return (
    <Paper variant="outlined" sx={{ width: '100%' }}>
      <Box sx={{ overflowX: 'auto', p: 2 }}>
        <Box
          ref={stageRef}
          sx={{
            position: 'relative',
            width: '100%',
            minWidth: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            mx: 'auto',
          }}
        >
          <ThemeProvider theme={enhanced ? densityTheme : defaultTheme}>
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Button
                ref={buttonRef}
                variant="outlined"
                size={size}
                startIcon={<AddIcon />}
              >
                <span ref={labelRef}>Button</span>
              </Button>
            </Box>
          </ThemeProvider>
          {metrics ? (
            <Annotations metrics={metrics} enhanced={enhanced} size={size} />
          ) : null}
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          px: 2,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          flexWrap: 'wrap',
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={enhanced}
              onChange={(event) => setEnhanced(event.target.checked)}
            />
          }
          label="Enhance density"
        />
        <ToggleButtonGroup
          exclusive
          size="small"
          value={size}
          onChange={(event, next) => {
            if (next) {
              setSize(next);
            }
          }}
          aria-label="button size"
        >
          {SIZES.map((option) => (
            <ToggleButton key={option} value={option} sx={{ textTransform: 'none' }}>
              {option}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </Paper>
  );
}
