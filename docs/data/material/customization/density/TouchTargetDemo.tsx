import * as React from 'react';
import { createTheme, enhanceDensity, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import DraftsIcon from '@mui/icons-material/Drafts';
import InboxIcon from '@mui/icons-material/Inbox';
import SettingsIcon from '@mui/icons-material/Settings';
import StarIcon from '@mui/icons-material/Star';

const colorSchemes = { light: true, dark: true };

// A row of body text floors at 32px (a 24px line plus its padding), so the
// steps below that would leave the list where it is.
const TOUCH_STEPS = [32, 36, 40, 44];
const ICON_STEPS = [12, 14, 16, 20, 24];

const ITEMS = [
  { label: 'Inbox', icon: <InboxIcon /> },
  { label: 'Starred', icon: <StarIcon /> },
  { label: 'Drafts', icon: <DraftsIcon /> },
  { label: 'Settings', icon: <SettingsIcon /> },
];

/** One row's worth of gutter: a dimension bar of the measured height, with the
 * value beside it. Kept outside the list so its markup stays a plain nav list. */
function Gutter({
  side,
  barHeight,
  rowHeight,
}: {
  side: 'left' | 'right';
  barHeight: number;
  rowHeight: number;
}) {
  const value = (
    <Typography
      variant="caption"
      sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}
    >
      {barHeight ? `${Math.round(barHeight)}px` : ''}
    </Typography>
  );
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
      {ITEMS.map((item) => (
        <Box
          key={item.label}
          sx={{
            height: rowHeight || 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: side === 'left' ? 'flex-end' : 'flex-start',
            gap: 0.75,
            px: 1.5,
          }}
        >
          {side === 'left' ? value : null}
          <Box
            aria-hidden
            sx={{
              flexShrink: 0,
              width: 9,
              height: barHeight,
              borderTop: '1px solid',
              borderBottom: '1px solid',
              borderColor: 'text.secondary',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                insetBlock: 0,
                left: 4,
                borderLeft: '1px solid',
                borderColor: 'text.secondary',
              },
            }}
          />
          {side === 'right' ? value : null}
        </Box>
      ))}
    </Box>
  );
}

function Knob({
  label,
  value,
  steps,
  onChange,
}: {
  label: string;
  value: number;
  steps: number[];
  onChange: (next: number) => void;
}) {
  return (
    <Box sx={{ px: 3, py: 1.5 }}>
      <Typography variant="body2" sx={{ mb: 0.5 }}>
        <code>{label}</code>
      </Typography>
      <Slider
        value={value}
        onChange={(event, next) => onChange(next as number)}
        step={null}
        min={steps[0]}
        max={steps[steps.length - 1]}
        marks={steps.map((step) => ({ value: step, label: `${step}` }))}
        valueLabelDisplay="off"
        aria-label={label}
      />
    </Box>
  );
}

export default function TouchTargetDemo() {
  const [touchTarget, setTouchTarget] = React.useState(32);
  const [iconTarget, setIconTarget] = React.useState(16);
  const [sizes, setSizes] = React.useState({ row: 0, icon: 0 });
  const rowRef = React.useRef<HTMLDivElement>(null);

  const theme = React.useMemo(
    () =>
      enhanceDensity(createTheme({ colorSchemes }), {
        'touch-target': touchTarget,
        'icon-target': iconTarget,
      }),
    [touchTarget, iconTarget],
  );

  // Both numbers come off the rendered row, so the bars can't drift from what
  // the theme emits.
  React.useEffect(() => {
    const row = rowRef.current;
    if (!row) {
      return undefined;
    }
    const measure = () => {
      const icon = row.querySelector('svg');
      setSizes({
        row: row.getBoundingClientRect().height,
        icon: icon ? icon.getBoundingClientRect().height : 0,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row, { box: 'border-box' });
    return () => observer.disconnect();
  }, [touchTarget, iconTarget]);

  return (
    <Paper variant="outlined" sx={{ width: '100%' }}>
      <Box sx={{ overflowX: 'auto', py: 2 }}>
        <Box
          sx={{
            minWidth: 440,
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'start',
          }}
        >
          <ThemeProvider theme={theme}>
            <Gutter side="left" barHeight={sizes.icon} rowHeight={sizes.row} />
            <Box component="nav" aria-label="mailbox folders">
              <List disablePadding sx={{ width: 240 }}>
                {ITEMS.map((item, index) => (
                  <React.Fragment key={item.label}>
                    {index > 0 ? <Divider component="li" /> : null}
                    <ListItem disablePadding>
                      <ListItemButton ref={index === 0 ? rowRef : undefined}>
                        <ListItemIcon
                          sx={{ '& svg': { outline: '1px dashed currentColor' } }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </Box>
            <Gutter side="right" barHeight={sizes.row} rowHeight={sizes.row} />
          </ThemeProvider>
        </Box>
      </Box>
      <Divider />
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <Knob
          label="icon-target"
          value={iconTarget}
          steps={ICON_STEPS}
          onChange={setIconTarget}
        />
        <Box sx={{ borderLeft: '1px solid', borderColor: 'divider' }}>
          <Knob
            label="touch-target"
            value={touchTarget}
            steps={TOUCH_STEPS}
            onChange={setTouchTarget}
          />
        </Box>
      </Box>
    </Paper>
  );
}
