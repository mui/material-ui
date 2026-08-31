import * as React from 'react';
import { createTheme, enhanceDensity, ThemeProvider } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
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

const themes = STEPS.reduce<Record<number, ReturnType<typeof enhanceDensity>>>(
  (acc, value) => {
    acc[value] = enhanceDensity(createTheme({ colorSchemes }), {
      'touch-target': value,
    });
    return acc;
  },
  {},
);

/** Rows are one interactive box tall. A row that reports more than the current
 * value is carrying a wrapper that pads around the box rather than sitting in
 * it — the label is measured so it can say so. */
function Row({ value, children }: { value: number; children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(value);

  React.useEffect(() => {
    const cell = ref.current;
    if (!cell) {
      return undefined;
    }
    const measure = () => setHeight(Math.round(cell.getBoundingClientRect().height));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(cell, { box: 'border-box' });
    return () => observer.disconnect();
  }, [value]);

  return (
    <React.Fragment>
      {children}
      <Box ref={ref} sx={{ justifyContent: 'center' }}>
        <Typography
          variant="caption"
          sx={{ color: height === value ? 'text.secondary' : 'warning.main' }}
        >
          {height}px
        </Typography>
      </Box>
    </React.Fragment>
  );
}

export default function TouchTargetDemo() {
  const [value, setValue] = React.useState(32);

  return (
    <Paper variant="outlined" sx={{ width: '100%' }}>
      <Box sx={{ overflowX: 'auto', p: 2 }}>
        <ThemeProvider theme={themes[value]}>
          <Box
            sx={{
              minWidth: 520,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr) auto',
              gridAutoRows: `minmax(${value}px, auto)`,
              // 1px gaps over a divider-colored ground draw the grid lines.
              gap: '1px',
              bgcolor: 'divider',
              border: '1px solid',
              borderColor: 'divider',
              '& > *': {
                bgcolor: 'background.paper',
                display: 'flex',
                alignItems: 'center',
                px: 1.5,
                minWidth: 0,
              },
            }}
          >
            <Row value={value}>
              <div>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Notify"
                />
              </div>
              <div>
                <FormControlLabel control={<Radio checked />} label="Daily" />
              </div>
              <div>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Public"
                />
              </div>
            </Row>

            <Row value={value}>
              <div>
                <Button variant="contained">Button</Button>
              </div>
              <div>
                <Chip variant="outlined" label="Chip" onDelete={() => {}} />
              </div>
              <div>
                <ToggleButtonGroup value="bold" exclusive>
                  <ToggleButton value="bold" aria-label="bold">
                    <FormatBoldIcon />
                  </ToggleButton>
                  <ToggleButton value="italic" aria-label="italic">
                    <FormatItalicIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </Row>

            <Row value={value}>
              <Box sx={{ gridColumn: 'span 3' }}>
                <FormControl sx={{ width: 220 }}>
                  <InputLabel htmlFor="density-project">Project</InputLabel>
                  <OutlinedInput
                    id="density-project"
                    label="Project"
                    defaultValue="Acme"
                  />
                </FormControl>
              </Box>
            </Row>

            <Row value={value}>
              <Box sx={{ gridColumn: 'span 3' }}>
                <AvatarGroup total={4}>
                  <Avatar>M</Avatar>
                  <Avatar>U</Avatar>
                </AvatarGroup>
              </Box>
            </Row>

            <Row value={value}>
              <Box sx={{ gridColumn: 'span 3' }}>
                <Autocomplete
                  multiple
                  options={['Design', 'Docs', 'Infra']}
                  defaultValue={['Design']}
                  sx={{ width: '100%' }}
                  renderInput={(params) => <TextField {...params} label="Tags" />}
                />
              </Box>
            </Row>
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
          onChange={(event, next) => setValue(next as number)}
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
