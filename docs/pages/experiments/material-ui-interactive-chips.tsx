import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FaceIcon from '@mui/icons-material/Face';
import Chip from '@mui/material/Chip';
import ChipButton from '@mui/material/ChipButton';
import ChipDelete from '@mui/material/ChipDelete';
import ChipLink from '@mui/material/ChipLink';

export default function MaterialUiInteractiveChips() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  const [chips, setChips] = React.useState(['Deletable 1', 'Deletable 2', 'Deletable 3']);
  const handleDelete = (chipToDelete: string) => () => {
    setChips((prev) => prev.filter((chip) => chip !== chipToDelete));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 3, maxWidth: 720, bgcolor: 'background.default', color: 'text.primary' }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Interactive Chips (material-ui)
        </Typography>

        {/* -- Action chip (button) -- */}
        <Section title="Action chip — Filled">
          <Chip label="Default" action={<ChipButton onClick={() => {}} />} />
          <Chip label="Primary" color="primary" action={<ChipButton onClick={() => {}} />} />
          <Chip label="Secondary" color="secondary" action={<ChipButton onClick={() => {}} />} />
          <Chip label="Error" color="error" action={<ChipButton onClick={() => {}} />} />
          <Chip label="Success" color="success" action={<ChipButton onClick={() => {}} />} />
          <Chip label="Info" color="info" action={<ChipButton onClick={() => {}} />} />
          <Chip label="Warning" color="warning" action={<ChipButton onClick={() => {}} />} />
        </Section>

        <Section title="Action chip — Outlined">
          <Chip label="Default" variant="outlined" action={<ChipButton onClick={() => {}} />} />
          <Chip
            label="Primary"
            variant="outlined"
            color="primary"
            action={<ChipButton onClick={() => {}} />}
          />
          <Chip
            label="Secondary"
            variant="outlined"
            color="secondary"
            action={<ChipButton onClick={() => {}} />}
          />
          <Chip
            label="Error"
            variant="outlined"
            color="error"
            action={<ChipButton onClick={() => {}} />}
          />
        </Section>

        <Section title="Action chip — Sizes">
          <Chip label="Small" size="small" action={<ChipButton onClick={() => {}} />} />
          <Chip label="Medium" action={<ChipButton onClick={() => {}} />} />
        </Section>

        {/* -- With adornments -- */}
        <Section title="With startAdornment (icon)">
          <Chip
            label="With icon"
            action={<ChipButton onClick={() => {}} />}
            startAdornment={<FaceIcon />}
          />
          <Chip
            label="Small with icon"
            size="small"
            action={<ChipButton onClick={() => {}} />}
            startAdornment={<FaceIcon />}
          />
        </Section>

        <Section title="With startAdornment (avatar)">
          <Chip
            label="With avatar"
            action={<ChipButton onClick={() => {}} />}
            startAdornment={<Avatar>M</Avatar>}
          />
          <Chip
            label="Small with avatar"
            size="small"
            action={<ChipButton onClick={() => {}} />}
            startAdornment={<Avatar alt="Test" src="/static/images/avatar/1.jpg" />}
          />
        </Section>

        <Section title="With endAdornment (icon)">
          <Chip
            label="Trailing icon"
            action={<ChipButton onClick={() => {}} />}
            endAdornment={<FaceIcon />}
          />
          <Chip
            label="Outlined trailing icon"
            variant="outlined"
            color="secondary"
            action={<ChipButton onClick={() => {}} />}
            endAdornment={<FaceIcon />}
          />
          <Chip
            label="Small trailing icon"
            size="small"
            action={<ChipButton onClick={() => {}} />}
            endAdornment={<FaceIcon />}
          />
        </Section>

        <Section title="With endAdornment (avatar)">
          <Chip
            label="Trailing avatar"
            action={<ChipButton onClick={() => {}} />}
            endAdornment={<Avatar>M</Avatar>}
          />
          <Chip
            label="Primary trailing avatar"
            color="primary"
            action={<ChipButton onClick={() => {}} />}
            endAdornment={<Avatar>J</Avatar>}
          />
          <Chip
            label="Small trailing avatar"
            size="small"
            action={<ChipButton onClick={() => {}} />}
            endAdornment={<Avatar alt="Test" src="/static/images/avatar/1.jpg" />}
          />
        </Section>

        {/* -- With delete -- */}
        <Section title="With endAdornment (ChipDelete)">
          <Chip
            label="Deletable"
            action={<ChipButton onClick={() => {}} />}
            endAdornment={<ChipDelete onClick={() => {}} />}
          />
          <Chip
            label="Outlined deletable"
            variant="outlined"
            color="primary"
            action={<ChipButton onClick={() => {}} />}
            endAdornment={<ChipDelete onClick={() => {}} />}
          />
          <Chip
            label="Small deletable"
            size="small"
            action={<ChipButton onClick={() => {}} />}
            endAdornment={<ChipDelete onClick={() => {}} />}
          />
          <Chip
            label="Small + disableRipple"
            size="small"
            action={<ChipButton onClick={() => {}} disableRipple />}
            endAdornment={<ChipDelete onClick={() => {}} />}
          />
        </Section>

        <Section title="With startAdornment (ChipDelete)">
          <Chip
            label="Leading delete"
            action={<ChipButton onClick={() => {}} />}
            startAdornment={<ChipDelete onClick={() => {}} />}
          />
          <Chip
            label="Outlined leading delete"
            variant="outlined"
            color="primary"
            action={<ChipButton onClick={() => {}} />}
            startAdornment={<ChipDelete onClick={() => {}} />}
          />
          <Chip
            label="Small leading delete"
            size="small"
            action={<ChipButton onClick={() => {}} />}
            startAdornment={<ChipDelete onClick={() => {}} />}
          />
        </Section>

        <Section title="Delete only (no action)">
          <Chip label="Delete only" endAdornment={<ChipDelete onClick={() => {}} />} />
          <Chip label="Leading delete only" startAdornment={<ChipDelete onClick={() => {}} />} />
          <Chip
            label="With icon + delete"
            startAdornment={<FaceIcon />}
            endAdornment={<ChipDelete onClick={() => {}} />}
          />
        </Section>

        <Section title="With both adornments">
          <Chip
            label="Avatar + trailing icon"
            action={<ChipButton onClick={() => {}} />}
            startAdornment={<Avatar>M</Avatar>}
            endAdornment={<FaceIcon />}
          />
          <Chip
            label="Leading delete + trailing icon"
            action={<ChipButton onClick={() => {}} />}
            startAdornment={<ChipDelete onClick={() => {}} />}
            endAdornment={<FaceIcon />}
          />
          <Chip
            label="Avatar + delete link"
            action={<ChipLink href="#chip-link" />}
            startAdornment={<Avatar>R</Avatar>}
            endAdornment={<ChipDelete onClick={() => {}} />}
          />
        </Section>

        {/* -- Disabled states -- */}
        <Section title="Disabled (focusableWhenDisabled=true, default)">
          <Chip label="Disabled" disabled action={<ChipButton onClick={() => {}} />} />
          <Chip
            label="Disabled with delete"
            disabled
            action={<ChipButton onClick={() => {}} />}
            endAdornment={<ChipDelete onClick={() => {}} />}
          />
          <Chip
            label="Disabled outlined"
            disabled
            variant="outlined"
            color="primary"
            action={<ChipButton onClick={() => {}} />}
          />
        </Section>

        <Section title="Disabled (focusableWhenDisabled=false)">
          <Chip
            label="Not focusable"
            disabled
            action={<ChipButton onClick={() => {}} focusableWhenDisabled={false} />}
          />
          <Chip
            label="Not focusable + delete"
            disabled
            action={<ChipButton onClick={() => {}} focusableWhenDisabled={false} />}
            endAdornment={<ChipDelete onClick={() => {}} />}
          />
        </Section>

        {/* -- Link chip -- */}
        <Section title="Link chip">
          <Chip label="Link chip" action={<ChipLink href="#chip-link" />} />
          <Chip label="Primary link" color="primary" action={<ChipLink href="#chip-link" />} />
          <Chip label="Outlined link" variant="outlined" action={<ChipLink href="#chip-link" />} />
          <Chip label="Small link" size="small" action={<ChipLink href="#chip-link" />} />
        </Section>

        <Section title="Link chip — With adornments">
          <Chip
            label="Link with icon"
            action={<ChipLink href="#chip-link" />}
            startAdornment={<FaceIcon />}
          />
          <Chip
            label="Link with trailing icon"
            action={<ChipLink href="#chip-link" />}
            endAdornment={<FaceIcon />}
          />
          <Chip
            label="Link with leading delete"
            action={<ChipLink href="#chip-link" />}
            startAdornment={<ChipDelete onClick={() => {}} />}
          />
          <Chip
            label="Deletable link"
            action={<ChipLink href="#chip-link" />}
            endAdornment={<ChipDelete onClick={() => {}} />}
          />
          <Chip
            label="No ripple"
            action={<ChipLink href="#chip-link" disableRipple />}
            endAdornment={<ChipDelete onClick={() => {}} />}
          />
        </Section>

        {/* -- ClickAway bug repro -- */}
        <ClickAwayPopperSection />

        {/* -- Static chip (no action) -- */}
        <Section title="Static chip (no action)">
          <Chip label="Static chip" />
          <Chip label="With icon" startAdornment={<FaceIcon />} />
          <Chip label="Primary" color="primary" />
        </Section>

        {/* -- Live delete demo with aria-live -- */}
        <Section title="Live delete demo (with aria-live region)">
          <Box
            aria-live="polite"
            aria-atomic="false"
            sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}
          >
            {chips.map((chip) => (
              <Chip
                key={chip}
                label={chip}
                color="primary"
                action={<ChipButton onClick={() => {}} />}
                endAdornment={<ChipDelete onClick={handleDelete(chip)} />}
              />
            ))}
            {chips.length === 0 && (
              <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                All chips deleted.
              </Typography>
            )}
          </Box>
        </Section>
      </Box>
    </ThemeProvider>
  );
}

function ClickAwayPopperSection() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>();
  const isOpen = Boolean(anchorEl);

  return (
    <Box sx={{ mb: 4 }}>
      <a href="https://github.com/mui/material-ui/issues/47234" id="popper-bug">
        <Typography variant="subtitle2" sx={{ mb: 1.5, color: 'text.secondary' }}>
          ClickAway + Popper bug repro
        </Typography>
      </a>
      <Typography variant="body2" sx={{ mb: 1.5 }}>
        Open the popper, then click the delete icon on the chip. With the old API the popper does
        NOT close (bug). With the new API it should close.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          New API:
        </Typography>
        <Chip
          label="Click delete icon"
          action={<ChipButton onClick={() => {}} />}
          endAdornment={<ChipDelete onClick={() => {}} />}
        />
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          Old API:
        </Typography>
        <Chip label="Click delete icon" onDelete={() => {}} />
      </Box>
      <Button
        variant="contained"
        size="small"
        onClick={({ currentTarget }) => {
          setAnchorEl(isOpen ? undefined : currentTarget);
        }}
      >
        {isOpen ? 'Close Popper' : 'Open Popper'}
      </Button>
      <Popper open={isOpen} anchorEl={anchorEl} placement="bottom-start">
        <ClickAwayListener onClickAway={() => setAnchorEl(undefined)}>
          <Paper sx={{ p: 3, maxWidth: 300, mt: 1 }}>
            <Typography variant="body2">
              Clicking anywhere on the page closes this popper.
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: 'error.main' }}>
              Bug: clicking the delete icon on the OLD API chip does NOT close the popper (because
              of stopPropagation on ButtonBase).
            </Typography>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle2" sx={{ mb: 1.5, color: 'text.secondary' }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>{children}</Box>
    </Box>
  );
}
