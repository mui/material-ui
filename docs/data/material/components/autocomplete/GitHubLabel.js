import * as React from 'react';
import PropTypes from 'prop-types';
import useId from '@mui/utils/useId';
import { alpha, styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import ButtonBase from '@mui/material/ButtonBase';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

const TriggerButton = styled(ButtonBase)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  paddingBlock: 5,
  paddingInline: 8,
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 600,
  fontFamily: 'inherit',
  textAlign: 'left',
  color: primer.light.fgMuted,
  transition: 'background-color 80ms',
  ...theme.applyStyles('dark', { color: primer.dark.fgMuted }),
  '& svg': { color: 'currentColor' },
  '&:hover': {
    backgroundColor: primer.light.transparentHover,
    ...theme.applyStyles('dark', { backgroundColor: primer.dark.transparentHover }),
  },
  '&[aria-expanded="true"]': {
    backgroundColor: primer.light.transparentActive,
    ...theme.applyStyles('dark', { backgroundColor: primer.dark.transparentActive }),
  },
  '&:focus-visible': {
    outlineWidth: 2,
    outlineStyle: 'solid',
    outlineColor: primer.light.fgAccent,
    outlineOffset: -2,
    ...theme.applyStyles('dark', { outlineColor: primer.dark.fgAccent }),
  },
}));

const Panel = styled(Popper)(({ theme }) => ({
  zIndex: theme.zIndex.modal,
  width: PANEL_WIDTH,
  maxWidth: `calc(100vw - ${theme.spacing(4)})`,
  borderRadius: 12,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: primer.light.borderMuted,
  boxShadow: `0 ${theme.spacing(1)} ${theme.spacing(3)} ${primer.light.overlayShadowColor}`,
  backgroundColor: primer.light.bgDefault,
  color: primer.light.fgDefault,
  fontSize: 14,
  ...theme.applyStyles('dark', {
    borderColor: primer.dark.borderMuted,
    boxShadow: `0 ${theme.spacing(1)} ${theme.spacing(3)} ${primer.dark.overlayShadowColor}`,
    backgroundColor: primer.dark.bgDefault,
    color: primer.dark.fgDefault,
  }),
}));

const SearchField = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  minHeight: 32,
  paddingBlock: 0,
  paddingInline: 8,
  borderRadius: 6,
  backgroundColor: primer.light.bgInset,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: primer.light.borderMuted,
  color: primer.light.fgMuted,
  fontSize: 14,
  lineHeight: 20 / 14,
  ...theme.applyStyles('dark', {
    backgroundColor: primer.dark.bgInset,
    borderColor: primer.dark.borderMuted,
    color: primer.dark.fgMuted,
  }),
  '&:focus-within': {
    borderColor: primer.light.fgAccent,
    outlineWidth: 2,
    outlineStyle: 'solid',
    outlineColor: primer.light.fgAccent,
    outlineOffset: -1,
    ...theme.applyStyles('dark', {
      borderColor: primer.dark.fgAccent,
      outlineColor: primer.dark.fgAccent,
    }),
  },
  '& input': {
    fontSize: 14,
    color: primer.light.fgDefault,
    ...theme.applyStyles('dark', { color: primer.dark.fgDefault }),
    '&::placeholder': {
      color: primer.light.fgMuted,
      opacity: 1,
      ...theme.applyStyles('dark', { color: primer.dark.fgMuted }),
    },
  },
}));

// `width: 100%` keeps the listbox flush with the panel; without it, popper.js's
// inline positioning style would constrain the wrapper and leave a gap to the
// right of the scrollbar.
const ListboxContainer = styled('div')(({ theme }) => ({
  width: '100%',
  [`& .${autocompleteClasses.paper}`]: {
    margin: 0,
    color: 'inherit',
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  [`& .${autocompleteClasses.listbox}`]: {
    // Vertical-only padding so the listbox's content area is full-width.
    // Horizontal inset is applied via `margin-inline` on each option.
    paddingBlock: 8,
    paddingInline: 0,
    maxHeight: LISTBOX_MAX_HEIGHT,
    backgroundColor: 'transparent',
    [`& .${autocompleteClasses.option}`]: {
      position: 'relative',
      marginInline: 8,
      borderRadius: 6,
      paddingBlock: 6,
      paddingInline: 8,
      gap: 8,
      alignItems: 'flex-start',
      // Let the focus indicator extend into the listbox gutter.
      overflow: 'visible',
      '&:not(:first-of-type)::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 8,
        right: 8,
        height: 1,
        backgroundColor: primer.light.borderMuted,
        ...theme.applyStyles('dark', { backgroundColor: primer.dark.borderMuted }),
      },
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent',
      },
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
        {
          backgroundColor: primer.light.transparentHover,
          ...theme.applyStyles('dark', {
            backgroundColor: primer.dark.transparentHover,
          }),
        },
      [`&.${autocompleteClasses.focused}::after`]: {
        content: '""',
        position: 'absolute',
        top: 6,
        bottom: 6,
        left: -8,
        width: 3,
        borderRadius: 6,
        backgroundColor: primer.light.fgAccent,
        ...theme.applyStyles('dark', { backgroundColor: primer.dark.fgAccent }),
      },
      [`&.${autocompleteClasses.focused}::before, &.${autocompleteClasses.focused} + li::before`]:
        {
          visibility: 'hidden',
        },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: 'relative',
  },
}));

function ListboxPopper(props) {
  // Discard popper.js positioning props — we render inline within the panel.
  const { disablePortal, anchorEl, open, style, ...other } = props;
  return <ListboxContainer {...other} />;
}

ListboxPopper.propTypes = {
  anchorEl: PropTypes.any,
  disablePortal: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  style: PropTypes.object,
};

const OptionIndicator = styled('span')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: 16,
  height: 16,
  marginTop: 4,
  borderRadius: 4,
  backgroundColor: primer.light.bgDefault,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: primer.light.borderEmphasis,
  ...theme.applyStyles('dark', {
    backgroundColor: primer.dark.bgDefault,
    borderColor: primer.dark.borderEmphasis,
  }),
  '& svg': {
    color: '#ffffff',
    visibility: 'hidden',
  },
  '&[data-checked]': {
    backgroundColor: primer.light.fgAccent,
    borderColor: primer.light.fgAccent,
    ...theme.applyStyles('dark', {
      backgroundColor: primer.dark.fgAccent,
      borderColor: primer.dark.fgAccent,
    }),
    '& svg': {
      visibility: 'visible',
    },
  },
}));

// Pin already-selected items to the top of the list.
function selectedFirst(all, selected) {
  const order = (label) => {
    const i = selected.indexOf(label);
    return i === -1 ? selected.length + all.indexOf(label) : i;
  };
  return [...all].sort((a, b) => order(a) - order(b));
}

function isLightLabel(color) {
  const red = Number.parseInt(color.slice(1, 3), 16);
  const green = Number.parseInt(color.slice(3, 5), 16);
  const blue = Number.parseInt(color.slice(5, 7), 16);
  const perceivedLightness = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255;
  return perceivedLightness > 0.96;
}

function LabelPill({ label }) {
  return (
    <Box
      component="span"
      sx={(theme) => ({
        display: 'inline-block',
        boxSizing: 'border-box',
        py: 0,
        px: 0.875,
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 18 / 12,
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        borderRadius: '2em',
        borderWidth: 1,
        borderStyle: 'solid',
        color: theme.palette.getContrastText(label.color),
        backgroundColor: label.color,
        borderColor: isLightLabel(label.color)
          ? 'rgba(31,35,40,0.15)'
          : 'transparent',
        ...theme.applyStyles('dark', {
          color: theme.lighten(label.color, 0.45),
          backgroundColor: alpha(label.color, 0.18),
          borderColor: alpha(label.color, 0.3),
        }),
      })}
    >
      {label.name}
    </Box>
  );
}

LabelPill.propTypes = {
  label: PropTypes.shape({
    color: PropTypes.string.isRequired,
    description: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default function GitHubLabel() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // `value` is the committed selection rendered in the sidebar.
  // `pendingValue` tracks edits while the picker is open and commits on close.
  const [value, setValue] = React.useState([labels[0], labels[4]]);
  const [pendingValue, setPendingValue] = React.useState([]);

  const open = Boolean(anchorEl);
  const panelId = useId();
  const panelTitleId = panelId ? `${panelId}-title` : undefined;

  // `restoreFocus` returns focus to the trigger button — appropriate for
  // keyboard dismissal (Escape), but not for click-away or tab-out, which
  // should leave focus on whatever the user moved it to.
  const handleClose = ({ restoreFocus = false } = {}) => {
    setValue(pendingValue);
    if (restoreFocus) {
      anchorEl?.focus();
    }
    setAnchorEl(null);
  };

  const handleToggle = (event) => {
    if (open) {
      handleClose();
    } else {
      setPendingValue(value);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClickAway = (event) => {
    if (anchorEl?.contains(event.target)) {
      return;
    }
    handleClose();
  };

  return (
    <React.Fragment>
      <Box
        sx={(theme) => ({
          width: TRIGGER_WIDTH,
          pb: 1.5,
          borderBottom: 1,
          borderColor: primer.light.borderMuted,
          ...theme.applyStyles('dark', {
            borderColor: primer.dark.borderMuted,
          }),
        })}
      >
        <TriggerButton
          aria-controls={open ? panelId : undefined}
          aria-haspopup="dialog"
          aria-expanded={open}
          disableRipple
          onClick={handleToggle}
        >
          Labels
          <GearIcon />
        </TriggerButton>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5,
            mt: 1,
            pl: 1,
          }}
        >
          {value.length === 0 ? (
            <Box
              sx={(theme) => ({
                fontSize: 12,
                color: primer.light.fgMuted,
                ...theme.applyStyles('dark', { color: primer.dark.fgMuted }),
              })}
            >
              None yet
            </Box>
          ) : (
            value.map((label) => <LabelPill key={label.name} label={label} />)
          )}
        </Box>
      </Box>

      <Panel
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        modifiers={[{ name: 'offset', options: { offset: [0, 8] } }]}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <div id={panelId} role="dialog" aria-labelledby={panelTitleId}>
            <Box
              id={panelTitleId}
              component="h2"
              sx={(theme) => ({
                margin: 0,
                pt: 1.5,
                px: 2,
                pb: 1,
                fontSize: 14,
                fontWeight: 600,
                borderBottom: 1,
                borderColor: primer.light.borderMuted,
                ...theme.applyStyles('dark', {
                  borderColor: primer.dark.borderMuted,
                }),
              })}
            >
              Apply labels
            </Box>
            <Autocomplete
              open
              multiple
              disableCloseOnSelect
              renderValue={() => null}
              value={pendingValue}
              options={selectedFirst(labels, value)}
              getOptionLabel={(option) => option.name}
              noOptionsText="No labels"
              onClose={(_event, reason) => {
                if (reason === 'escape') {
                  handleClose({ restoreFocus: true });
                } else if (reason === 'blur') {
                  handleClose();
                }
              }}
              onChange={(event, newValue, reason) => {
                // Backspace/Delete on a focused chip can trigger removeOption,
                // but we render no chips, so ignore those events.
                if (
                  event.type === 'keydown' &&
                  reason === 'removeOption' &&
                  (event.key === 'Backspace' || event.key === 'Delete')
                ) {
                  return;
                }
                setPendingValue(newValue);
              }}
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <OptionIndicator data-checked={selected || undefined}>
                      <CheckIcon />
                    </OptionIndicator>
                    <Box
                      component="span"
                      sx={{
                        width: 14,
                        height: 14,
                        mt: 0.625,
                        flexShrink: 0,
                        borderRadius: 1.5,
                      }}
                      style={{ backgroundColor: option.color }}
                    />
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Box sx={{ fontWeight: 500 }}>{option.name}</Box>
                      {option.description && (
                        <Box
                          sx={(theme) => ({
                            fontSize: 12,
                            color: primer.light.fgMuted,
                            ...theme.applyStyles('dark', {
                              color: primer.dark.fgMuted,
                            }),
                          })}
                        >
                          {option.description}
                        </Box>
                      )}
                    </Box>
                  </li>
                );
              }}
              renderInput={(params) => {
                const { ref, className, onMouseDown } = params.slotProps.input;

                return (
                  <Box sx={{ p: 1 }}>
                    <SearchField
                      ref={ref}
                      className={className}
                      onMouseDown={onMouseDown}
                    >
                      <SearchIcon />
                      <InputBase
                        inputProps={{
                          ...params.slotProps.htmlInput,
                          'aria-label': 'Filter labels',
                        }}
                        autoFocus
                        placeholder="Filter labels"
                        sx={{
                          flex: 1,
                          minWidth: 0,
                          fontSize: 14,
                          padding: 0,
                          color: 'inherit',
                        }}
                      />
                    </SearchField>
                  </Box>
                );
              }}
              slots={{ popper: ListboxPopper }}
            />
          </div>
        </ClickAwayListener>
      </Panel>
    </React.Fragment>
  );
}

// GitHub's default issue labels (created on every new repository),
// plus a few common community additions.
const labels = [
  { name: 'bug', color: '#d73a4a', description: "Something isn't working" },
  {
    name: 'documentation',
    color: '#0075ca',
    description: 'Improvements or additions to documentation',
  },
  {
    name: 'duplicate',
    color: '#cfd3d7',
    description: 'This issue or pull request already exists',
  },
  {
    name: 'enhancement',
    color: '#a2eeef',
    description: 'New feature or request',
  },
  {
    name: 'good first issue',
    color: '#7057ff',
    description: 'Good for newcomers',
  },
  {
    name: 'help wanted',
    color: '#008672',
    description: 'Extra attention is needed',
  },
  { name: 'invalid', color: '#e4e669', description: "This doesn't seem right" },
  {
    name: 'question',
    color: '#d876e3',
    description: 'Further information is requested',
  },
  { name: 'wontfix', color: '#cfd3d7', description: 'This will not be worked on' },
  { name: 'breaking change', color: '#ee0701' },
  { name: 'needs triage', color: '#d4c5f9' },
  { name: 'security', color: '#b60205' },
];

const primer = {
  light: {
    borderMuted: '#d1d9e0',
    borderEmphasis: '#818b98',
    fgMuted: '#59636e',
    fgDefault: '#1f2328',
    fgAccent: '#0969da',
    bgDefault: '#ffffff',
    bgInset: '#f6f8fa',
    transparentHover: 'rgba(208,215,222,0.32)',
    transparentActive: 'rgba(208,215,222,0.48)',
    overlayShadowColor: 'rgba(140,149,159,0.2)',
  },
  dark: {
    borderMuted: '#3d444d',
    borderEmphasis: '#7d8590',
    fgMuted: '#9198a1',
    fgDefault: '#f0f6fc',
    fgAccent: '#1f6feb',
    bgDefault: '#0d1117',
    bgInset: '#010409',
    transparentHover: 'rgba(101,108,118,0.18)',
    transparentActive: 'rgba(101,108,118,0.32)',
    overlayShadowColor: 'rgba(1,4,9,0.85)',
  },
};

const TRIGGER_WIDTH = 240;
const PANEL_WIDTH = 320;
const LISTBOX_MAX_HEIGHT = 320;

function GearIcon() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} fill="currentColor" aria-hidden>
      <path d="M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 0 1-.704 1.217c-.428.61-1.176.807-1.82.63l-1.102-.302c-.067-.019-.177-.011-.3.071a5.909 5.909 0 0 1-.668.386c-.133.066-.194.158-.211.224l-.29 1.106c-.168.646-.715 1.196-1.458 1.26a8.006 8.006 0 0 1-1.402 0c-.743-.064-1.289-.614-1.458-1.26l-.289-1.106c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 0 1-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 0 1-.704-1.218c-.315-.675-.111-1.422.363-1.891l.815-.806c.05-.048.098-.147.088-.294a6.214 6.214 0 0 1 0-.772c.01-.147-.038-.246-.088-.294l-.815-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 0 1 .704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071.214-.143.437-.272.668-.386.133-.066.194-.158.211-.224l.29-1.106C6.009.645 6.556.095 7.299.03 7.53.01 7.764 0 8 0Zm-.571 1.525c-.036.003-.108.036-.137.146l-.289 1.105c-.147.561-.549.967-.998 1.189-.173.086-.34.183-.5.29-.417.278-.97.423-1.529.27l-1.103-.303c-.109-.03-.175.016-.195.045-.22.312-.412.644-.573.99-.014.031-.021.11.059.19l.815.806c.411.406.562.957.53 1.456a4.709 4.709 0 0 0 0 .582c.032.499-.119 1.05-.53 1.456l-.815.806c-.081.08-.073.159-.059.19.162.346.353.677.573.989.02.03.085.076.195.046l1.102-.303c.56-.153 1.113-.008 1.53.27.161.107.328.204.501.29.447.222.85.629.997 1.189l.289 1.105c.029.109.101.143.137.146a6.6 6.6 0 0 0 1.142 0c.036-.003.108-.037.137-.146l.289-1.105c.147-.561.549-.967.998-1.189.173-.086.34-.183.5-.29.417-.278.97-.423 1.529-.27l1.103.303c.109.029.175-.016.195-.045.22-.313.411-.644.573-.99.014-.031.021-.11-.059-.19l-.815-.806c-.411-.406-.562-.957-.53-1.456a4.709 4.709 0 0 0 0-.582c-.032-.499.119-1.05.53-1.456l.815-.806c.081-.08.073-.159.059-.19a6.464 6.464 0 0 0-.573-.989c-.02-.03-.085-.076-.195-.046l-1.102.303c-.56.153-1.113.008-1.53-.27a4.44 4.44 0 0 0-.501-.29c-.447-.222-.85-.629-.997-1.189l-.289-1.105c-.029-.11-.101-.143-.137-.146a6.6 6.6 0 0 0-1.142 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9.5 8a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 9.5 8Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" width={12} height={12} fill="currentColor" aria-hidden>
      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16} fill="currentColor" aria-hidden>
      <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.998 0A4.499 4.499 0 0 0 11.5 7Z" />
    </svg>
  );
}
