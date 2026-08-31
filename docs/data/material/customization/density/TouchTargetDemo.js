import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme, enhanceDensity, ThemeProvider } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';

const colorSchemes = { light: true, dark: true };

const STEPS = [24, 28, 32, 38, 44];

const themes = STEPS.reduce((acc, value) => {
  acc[value] = enhanceDensity(createTheme({ colorSchemes }), {
    'touch-target': value,
  });
  return acc;
}, {});

/** One control plus the height it resolved to, measured off the rendered box. */
function Cell({ name, span, value, children }) {
  const ref = React.useRef(null);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    const control = ref.current?.firstElementChild;
    if (!control) {
      return undefined;
    }
    const measure = () => setHeight(control.getBoundingClientRect().height);
    measure();
    // Border box, not the default content box: a control can absorb the whole
    // change in its own padding, leaving the content box untouched.
    const observer = new ResizeObserver(measure);
    observer.observe(control, { box: 'border-box' });
    return () => observer.disconnect();
  }, [value]);

  return (
    <Box sx={{ gridColumn: `span ${span}` }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minHeight: 48 }}>
        <Box ref={ref} sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
          {children}
        </Box>
        <Box
          aria-hidden
          sx={{
            flexShrink: 0,
            width: 9,
            height,
            borderTop: '1px solid',
            borderBottom: '1px solid',
            borderColor: 'text.disabled',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              insetBlock: 0,
              left: 4,
              borderLeft: '1px solid',
              borderColor: 'text.disabled',
            },
          }}
        />
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', flexShrink: 0 }}
        >
          {height}px
        </Typography>
      </Box>
      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
        {name}
      </Typography>
    </Box>
  );
}

Cell.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  span: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function TouchTargetDemo() {
  const [value, setValue] = React.useState(32);

  return (
    <Paper variant="outlined" sx={{ width: '100%' }}>
      <Box sx={{ overflowX: 'auto', p: 2 }}>
        <ThemeProvider theme={themes[value]}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              columnGap: 2,
              rowGap: 2,
              minWidth: 480,
            }}
          >
            <Cell value={value} name="Checkbox" span={3}>
              <Checkbox defaultChecked />
            </Cell>
            <Cell value={value} name="Radio" span={3}>
              <Radio checked />
            </Cell>
            <Cell value={value} name="Switch" span={3}>
              <Switch defaultChecked />
            </Cell>
            <Cell value={value} name="Avatar" span={3}>
              <Avatar>M</Avatar>
            </Cell>

            <Cell value={value} name="Button" span={4}>
              <Button variant="contained">Button</Button>
            </Cell>
            <Cell value={value} name="Chip" span={4}>
              <Chip label="Chip" color="primary" />
            </Cell>
            <Cell value={value} name="ToggleButtonGroup" span={4}>
              <ToggleButtonGroup value="bold" exclusive size="medium">
                <ToggleButton value="bold" aria-label="bold">
                  <FormatBoldIcon />
                </ToggleButton>
                <ToggleButton value="italic" aria-label="italic">
                  <FormatItalicIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Cell>

            <Cell value={value} name="OutlinedInput" span={6}>
              <OutlinedInput defaultValue="Text" sx={{ width: 150 }} />
            </Cell>
            <Cell value={value} name="Autocomplete" span={6}>
              <Autocomplete
                options={['One', 'Two']}
                defaultValue="One"
                sx={{ width: 170 }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Cell>
          </Box>
        </ThemeProvider>
      </Box>
      <Divider />
      <Box sx={{ px: 3, py: 1.5, display: 'flex', alignItems: 'center', gap: 3 }}>
        <Typography variant="body2" sx={{ flexShrink: 0 }}>
          <code>touch-target</code>
        </Typography>
        <Slider
          value={value}
          onChange={(event, next) => setValue(next)}
          step={null}
          min={STEPS[0]}
          max={STEPS[STEPS.length - 1]}
          marks={STEPS.map((step) => ({ value: step, label: `${step}` }))}
          valueLabelDisplay="off"
          aria-label="touch target"
          sx={{ maxWidth: 380 }}
        />
      </Box>
    </Paper>
  );
}
