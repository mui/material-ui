import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme, enhanceDensity, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button, { buttonClasses } from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import AddIcon from '@mui/icons-material/Add';

const colorSchemes = { light: true, dark: true };

const defaultTheme = createTheme({ colorSchemes });
const densityTheme = enhanceDensity(createTheme({ colorSchemes }));

const STAGE_WIDTH = 420;
const STAGE_HEIGHT = 240;

const round = (value) => `${Math.round(value * 10) / 10}px`;

// With the enhancer on, every dimension is a value you can name; with it off
// they are the component's own built-in numbers.
const tokens = {
  height: 'touch-target',
  padding: "spacing('medium')",
  gap: "spacing('x-small')",
  icon: '0.8lh',
};

function Annotations({ metrics, enhanced }) {
  const { x, y, width, height } = metrics;
  const right = x + width;
  const bottom = y + height;
  const padRow = bottom + 30;
  const gapRow = y - 24;
  const iconRow = y - 12;
  const gapCenter = metrics.gapX + metrics.gap / 2;
  const iconCenter = metrics.iconX + metrics.iconSize / 2;
  const caption = (token, value) =>
    enhanced ? `${token} · ${round(value)}` : round(value);

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
        fontSize: 12,
        '& line, & polyline': { stroke: 'currentColor' },
        '& rect': { stroke: 'currentColor', fill: 'none' },
        '& text': { fill: 'currentColor' },
        '& .guide': { strokeDasharray: '3 3', opacity: 0.5 },
      }}
    >
      {/* Inline padding: a dimension line under each padding edge. */}
      {[x, x + metrics.padLeft, right - metrics.padRight, right].map((guideX) => (
        <line
          key={guideX}
          className="guide"
          x1={guideX}
          y1={bottom}
          x2={guideX}
          y2={padRow}
        />
      ))}
      <line x1={x} y1={padRow} x2={x + metrics.padLeft} y2={padRow} />
      <line x1={right - metrics.padRight} y1={padRow} x2={right} y2={padRow} />
      <text x={x + width / 2} y={padRow + 16} textAnchor="middle">
        {caption(tokens.padding, metrics.padLeft)}
      </text>

      {/* Icon-to-label gap, measured between the two rendered boxes. */}
      <line
        className="guide"
        x1={metrics.gapX}
        y1={y}
        x2={metrics.gapX}
        y2={gapRow}
      />
      <line
        className="guide"
        x1={metrics.gapX + metrics.gap}
        y1={y}
        x2={metrics.gapX + metrics.gap}
        y2={gapRow}
      />
      <line
        x1={metrics.gapX}
        y1={gapRow}
        x2={metrics.gapX + metrics.gap}
        y2={gapRow}
      />
      <text x={gapCenter} y={gapRow - 7} textAnchor="middle">
        {caption(tokens.gap, metrics.gap)}
      </text>

      {/* Icon box. */}
      <rect
        className="guide"
        x={metrics.iconX}
        y={metrics.iconY}
        width={metrics.iconSize}
        height={metrics.iconSize}
      />
      <polyline
        className="guide"
        fill="none"
        points={`${iconCenter},${metrics.iconY} ${iconCenter},${iconRow} ${x - 30},${iconRow}`}
      />
      <text x={x - 36} y={iconRow} textAnchor="end" dominantBaseline="middle">
        {caption(tokens.icon, metrics.iconSize)}
      </text>

      {/* Height is only a value the theme sets once the enhancer runs — without
            it the box is whatever the padding and line height add up to. */}
      {enhanced ? (
        <React.Fragment>
          <line x1={right + 14} y1={y} x2={right + 14} y2={bottom} />
          <line x1={right + 10} y1={y} x2={right + 18} y2={y} />
          <line x1={right + 10} y1={bottom} x2={right + 18} y2={bottom} />
          <text x={right + 24} y={y + height / 2} dominantBaseline="middle">
            {caption(tokens.height, height)}
          </text>
        </React.Fragment>
      ) : null}
    </Box>
  );
}

Annotations.propTypes = {
  enhanced: PropTypes.bool.isRequired,
  metrics: PropTypes.shape({
    gap: PropTypes.number.isRequired,
    gapX: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    iconSize: PropTypes.number.isRequired,
    iconX: PropTypes.number.isRequired,
    iconY: PropTypes.number.isRequired,
    padLeft: PropTypes.number.isRequired,
    padRight: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default function EnhanceDensityDemo() {
  const [enhanced, setEnhanced] = React.useState(true);
  const [metrics, setMetrics] = React.useState(null);
  const stageRef = React.useRef(null);
  const buttonRef = React.useRef(null);
  const labelRef = React.useRef(null);

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
      const icon = button.querySelector(`.${buttonClasses.startIcon}`);
      if (!icon) {
        return;
      }
      const stageBox = stage.getBoundingClientRect();
      const buttonBox = button.getBoundingClientRect();
      const iconBox = icon.getBoundingClientRect();
      const labelBox = label.getBoundingClientRect();
      const styles = window.getComputedStyle(button);
      setMetrics({
        x: buttonBox.left - stageBox.left,
        y: buttonBox.top - stageBox.top,
        width: buttonBox.width,
        height: buttonBox.height,
        padLeft: parseFloat(styles.paddingLeft),
        padRight: parseFloat(styles.paddingRight),
        iconX: iconBox.left - stageBox.left,
        iconY: iconBox.top - stageBox.top,
        iconSize: iconBox.width,
        gapX: iconBox.right - stageBox.left,
        gap: labelBox.left - iconBox.right,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(button);
    return () => observer.disconnect();
  }, [enhanced]);

  return (
    <Paper variant="outlined" sx={{ width: '100%' }}>
      <Box sx={{ overflowX: 'auto', p: 2 }}>
        <Box
          ref={stageRef}
          sx={{
            position: 'relative',
            width: STAGE_WIDTH,
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
              <Button ref={buttonRef} variant="contained" startIcon={<AddIcon />}>
                <span ref={labelRef}>Button</span>
              </Button>
            </Box>
          </ThemeProvider>
          {metrics ? <Annotations metrics={metrics} enhanced={enhanced} /> : null}
        </Box>
      </Box>
      <Divider />
      <Box sx={{ px: 2, py: 1 }}>
        <FormControlLabel
          control={
            <Switch
              checked={enhanced}
              onChange={(event) => setEnhanced(event.target.checked)}
            />
          }
          label="Enhance density"
        />
      </Box>
    </Paper>
  );
}
