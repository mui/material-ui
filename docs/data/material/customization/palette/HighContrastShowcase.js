import * as React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import LinearProgress from '@mui/material/LinearProgress';
import ListItemButton, { listItemButtonClasses } from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import NativeSelect from '@mui/material/NativeSelect';
import Radio from '@mui/material/Radio';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/Inbox';
import StarIcon from '@mui/icons-material/Star';
import {
  ThemeProvider,
  createTheme,
  enhanceHighContrast,
  useColorScheme,
} from '@mui/material/styles';

const autocompleteOptions = [
  { label: 'Disabled option', disabled: true },
  { label: 'Selected option' },
  { label: 'Focused option' },
];

function Section(props) {
  const { title, children } = props;

  return (
    <Stack
      sx={{
        gap: 1.5,
        minWidth: 0,
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
      }}
    >
      <Typography variant="subtitle2" component="h3">
        {title}
      </Typography>
      {children}
    </Stack>
  );
}

Section.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

export default function HighContrastShowcase() {
  const [enhanced, setEnhanced] = React.useState(false);
  const { mode, systemMode } = useColorScheme();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {
    noSsr: true,
  });
  const forcedColorsActive = useMediaQuery('(forced-colors: active)', {
    noSsr: true,
  });
  const docsMode = mode === 'system' ? systemMode : mode;
  let paletteMode = prefersDarkMode ? 'dark' : 'light';

  if (docsMode === 'dark' || docsMode === 'light') {
    paletteMode = docsMode;
  }

  const baseTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: paletteMode,
        },
      }),
    [paletteMode],
  );

  const theme = React.useMemo(() => {
    return enhanced ? enhanceHighContrast(baseTheme) : baseTheme;
  }, [baseTheme, enhanced]);

  return (
    <ThemeProvider theme={theme}>
      <Stack
        sx={{
          gap: 3,
          p: 2,
          color: 'text.primary',
          bgcolor: 'background.default',
          borderRadius: 1,
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            gap: 2,
            justifyContent: 'space-between',
            alignItems: { sm: 'center' },
          }}
        >
          <div>
            <Typography variant="subtitle1" component="h2">
              Forced colors component showcase
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              In Chrome, open DevTools &gt; More tools &gt; Rendering, then set
              <b> forced-colors</b> to active and <b>prefers-color-scheme</b> to
              light or dark. Then toggle the enhancer to compare the fix.
            </Typography>
          </div>
          <Stack sx={{ gap: 1, alignItems: { sm: 'flex-end' } }}>
            <FormControlLabel
              control={
                <Switch
                  checked={enhanced}
                  onChange={(event) => setEnhanced(event.target.checked)}
                />
              }
              label="Enhance high contrast"
            />
            <Typography
              variant="caption"
              sx={{ color: forcedColorsActive ? 'success.main' : 'text.secondary' }}
            >
              Forced colors: {forcedColorsActive ? 'active' : 'inactive'}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Color scheme: {paletteMode}
            </Typography>
          </Stack>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
          }}
        >
          <Section title="Inputs">
            <Stack sx={{ gap: 2 }}>
              <TextField
                error
                label="Error text field"
                defaultValue="Invalid value"
                helperText="Error helper text"
                variant="filled"
              />
              <TextField
                disabled
                label="Disabled text field"
                placeholder="Disabled placeholder"
                helperText="Disabled helper text"
                variant="standard"
              />
              <TextField
                disabled
                label="Disabled outlined field"
                defaultValue="Disabled value"
                variant="outlined"
              />
              <FormControl disabled variant="standard" sx={{ maxWidth: 260 }}>
                <InputLabel htmlFor="high-contrast-native-select">
                  Native select
                </InputLabel>
                <NativeSelect
                  defaultValue="first"
                  inputProps={{ id: 'high-contrast-native-select' }}
                >
                  <option value="first">First option</option>
                  <option value="second">Second option</option>
                </NativeSelect>
                <FormHelperText>Disabled icon and label</FormHelperText>
              </FormControl>
            </Stack>
          </Section>

          <Section title="Selection and navigation">
            <Stack sx={{ gap: 2 }}>
              <MenuList dense sx={{ border: '1px solid', borderColor: 'divider' }}>
                <MenuItem selected>Selected item</MenuItem>
                <MenuItem className={menuItemClasses.focusVisible}>
                  Focus-visible item
                </MenuItem>
                <MenuItem selected className={menuItemClasses.focusVisible}>
                  Selected + focus
                </MenuItem>
                <MenuItem disabled>Disabled item</MenuItem>
              </MenuList>

              <Stack sx={{ border: '1px solid', borderColor: 'divider' }}>
                <ListItemButton selected>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Selected row" />
                </ListItemButton>
                <ListItemButton
                  selected
                  className={listItemButtonClasses.focusVisible}
                >
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary="Selected + focus" />
                </ListItemButton>
              </Stack>
            </Stack>
          </Section>

          <Section title="Controls">
            <FormGroup>
              <FormControlLabel
                disabled
                control={<Checkbox defaultChecked />}
                label="Checkbox"
              />
              <FormControlLabel
                disabled
                control={<Radio defaultChecked />}
                label="Radio"
              />
              <FormControlLabel
                disabled
                control={<Switch defaultChecked />}
                label="Switch"
              />
            </FormGroup>
            <Box sx={{ maxWidth: 280 }}>
              <Typography variant="body2" id="disabled-slider">
                Disabled slider
              </Typography>
              <Slider disabled defaultValue={40} aria-labelledby="disabled-slider" />
            </Box>
            <ToggleButtonGroup value="selected" exclusive size="small">
              <ToggleButton value="selected">Selected</ToggleButton>
              <ToggleButton value="other">Other</ToggleButton>
            </ToggleButtonGroup>
          </Section>

          <Section title="Feedback and overlays">
            <Stack sx={{ gap: 2 }}>
              <div>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Linear progress buffer
                </Typography>
                <LinearProgress variant="buffer" value={55} valueBuffer={80} />
              </div>
              <Box sx={{ display: 'flex', py: 1 }}>
                <Tooltip
                  open
                  title="Tooltip with a visible border"
                  placement="right"
                >
                  <Button variant="outlined" sx={{ width: 'fit-content' }}>
                    Tooltip target
                  </Button>
                </Tooltip>
              </Box>
              <Accordion disabled defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  Disabled accordion
                </AccordionSummary>
                <AccordionDetails>
                  Disabled summary opacity should stay readable in forced colors.
                </AccordionDetails>
              </Accordion>
            </Stack>
          </Section>

          <Section title="Autocomplete">
            <Autocomplete
              open
              disablePortal
              options={autocompleteOptions}
              defaultValue={autocompleteOptions[1]}
              getOptionDisabled={(option) => Boolean(option.disabled)}
              renderInput={(params) => (
                <TextField {...params} label="Autocomplete" />
              )}
              sx={{ maxWidth: 320 }}
            />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Shows disabled and selected option styling.
            </Typography>
          </Section>

          <Section title="Focus">
            <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
              <Button variant="contained">Tab to focus</Button>
              <Button variant="outlined">Another focus target</Button>
            </Stack>
            <Divider />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Use keyboard navigation to compare the visible focus outline.
            </Typography>
          </Section>
        </Box>
      </Stack>
    </ThemeProvider>
  );
}
