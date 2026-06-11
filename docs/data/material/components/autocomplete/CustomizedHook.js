import * as React from 'react';
import PropTypes from 'prop-types';
import useAutocomplete from '@mui/material/useAutocomplete';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';

const langs = [
  { id: 'js', value: 'JavaScript' },
  { id: 'ts', value: 'TypeScript' },
  { id: 'py', value: 'Python' },
  { id: 'java', value: 'Java' },
  { id: 'cpp', value: 'C++' },
  { id: 'cs', value: 'C#' },
  { id: 'php', value: 'PHP' },
  { id: 'ruby', value: 'Ruby' },
  { id: 'go', value: 'Go' },
  { id: 'rust', value: 'Rust' },
  { id: 'swift', value: 'Swift' },
];

const defaultLangs = [langs[0]];

export default function CustomizedHook() {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getItemProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focusedItem,
    popupOpen,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    multiple: true,
    autoHighlight: true,
    defaultValue: defaultLangs,
    disableCloseOnSelect: true,
    options: langs,
    getOptionLabel: (option) => option.value,
    isOptionEqualToValue: (option, selectedValue) => option.id === selectedValue.id,
  });

  return (
    <Root {...getRootProps()}>
      <Label {...getInputLabelProps()}>Programming languages</Label>
      <InputWrapper
        ref={setAnchorEl}
        className={value.length > 0 ? 'hasChips' : undefined}
      >
        {value.map((option, index) => {
          const { key, ...itemProps } = getItemProps({ index });
          return (
            <StyledChip
              key={key}
              {...itemProps}
              label={option.value}
              highlighted={focusedItem === index}
            />
          );
        })}
        <input
          {...getInputProps()}
          placeholder={value.length > 0 ? '' : 'e.g. TypeScript'}
        />
      </InputWrapper>
      {popupOpen ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.length === 0 ? (
            <EmptyOption role="presentation">No languages found.</EmptyOption>
          ) : (
            groupedOptions.map((option, index) => {
              const { key, ...optionProps } = getOptionProps({ option, index });
              return (
                <Option key={key} {...optionProps}>
                  <CheckIcon />
                  <span>{option.value}</span>
                </Option>
              );
            })
          )}
        </Listbox>
      ) : null}
    </Root>
  );
}

const tokens = {
  light: {
    foreground: 'oklch(0.145 0 0)',
    foregroundRing: 'oklch(0.145 0 0 / 10%)',
    popover: 'oklch(1 0 0)',
    popoverForeground: 'oklch(0.145 0 0)',
    muted: 'oklch(0.97 0 0)',
    mutedForeground: 'oklch(0.556 0 0)',
    accent: 'oklch(0.97 0 0)',
    accentForeground: 'oklch(0.205 0 0)',
    input: 'oklch(0.922 0 0)',
    ring: 'oklch(0.708 0 0)',
    focusRing: 'oklch(0.708 0 0 / 50%)',
  },
  dark: {
    foreground: 'oklch(0.985 0 0)',
    foregroundRing: 'oklch(0.985 0 0 / 10%)',
    popover: 'oklch(0.205 0 0)',
    popoverForeground: 'oklch(0.985 0 0)',
    muted: 'oklch(0.269 0 0)',
    mutedForeground: 'oklch(0.708 0 0)',
    accent: 'oklch(0.269 0 0)',
    accentForeground: 'oklch(0.985 0 0)',
    input: 'oklch(1 0 0 / 15%)',
    ring: 'oklch(0.556 0 0)',
    focusRing: 'oklch(0.556 0 0 / 50%)',
  },
};

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 320,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  ...theme.applyStyles('dark', {
    colorScheme: 'dark',
  }),
}));

const Label = styled('label')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 14,
  lineHeight: 1,
  fontWeight: 500,
  color: tokens.light.foreground,
  userSelect: 'none',
  ...theme.applyStyles('dark', {
    color: tokens.dark.foreground,
  }),
}));

const InputWrapper = styled('div')(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 4,
  width: '100%',
  minHeight: 32,
  paddingBlock: 4,
  paddingInline: 10,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: tokens.light.input,
  borderRadius: 10,
  backgroundColor: 'transparent',
  backgroundClip: 'padding-box',
  color: tokens.light.foreground,
  cursor: 'text',
  fontSize: 14,
  transition: 'border-color 150ms, box-shadow 150ms, background-color 150ms',
  '&.hasChips': {
    paddingInline: 4,
  },
  '&:focus-within': {
    borderColor: tokens.light.ring,
    boxShadow: `0 0 0 3px ${tokens.light.focusRing}`,
  },
  '& input': {
    flex: 1,
    boxSizing: 'border-box',
    minWidth: 64,
    height: 24,
    margin: 0,
    padding: 0,
    border: 0,
    backgroundColor: 'transparent',
    color: tokens.light.foreground,
    fontFamily: 'inherit',
    fontSize: 14,
    fontWeight: 400,
    outline: 0,
  },
  '& input::placeholder': {
    color: tokens.light.mutedForeground,
  },
  ...theme.applyStyles('dark', {
    borderColor: tokens.dark.input,
    backgroundColor: 'oklch(1 0 0 / 4.5%)',
    '&:focus-within': {
      borderColor: tokens.dark.ring,
      boxShadow: `0 0 0 3px ${tokens.dark.focusRing}`,
    },
    '& input': {
      color: tokens.dark.foreground,
    },
    '& input::placeholder': {
      color: tokens.dark.mutedForeground,
    },
  }),
}));

function Chip(props) {
  const { className, highlighted, label, onDelete, ...other } = props;

  return (
    <div
      {...other}
      className={[className, highlighted ? 'focused' : null]
        .filter(Boolean)
        .join(' ')}
      aria-label={label}
    >
      {label}
      <button
        type="button"
        tabIndex={-1}
        aria-label={`Remove ${label}`}
        onClick={onDelete}
      >
        <XIcon />
      </button>
    </div>
  );
}

Chip.propTypes = {
  className: PropTypes.string,
  highlighted: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledChip = styled(Chip)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
  width: 'fit-content',
  height: 21,
  overflow: 'hidden',
  paddingInline: 6,
  borderRadius: 6,
  backgroundColor: tokens.light.muted,
  color: tokens.light.foreground,
  fontSize: 12,
  fontWeight: 500,
  paddingRight: 0,
  whiteSpace: 'nowrap',
  outline: 0,
  cursor: 'default',
  userSelect: 'none',
  '&.focused, &:focus-within': {
    boxShadow: `0 0 0 2px ${tokens.light.focusRing}`,
  },
  '& button': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    marginLeft: -4,
    padding: 0,
    border: 0,
    borderRadius: 8,
    background: 'none',
    color: 'inherit',
    cursor: 'default',
    opacity: 0.5,
    transition: 'opacity 150ms, background-color 150ms',
  },
  '@media (hover: hover)': {
    '& button:hover': {
      backgroundColor: tokens.light.muted,
      opacity: 1,
    },
  },
  '& svg': {
    width: 16,
    height: 16,
    pointerEvents: 'none',
    flexShrink: 0,
  },
  ...theme.applyStyles('dark', {
    backgroundColor: tokens.dark.muted,
    color: tokens.dark.foreground,
    '&.focused, &:focus-within': {
      boxShadow: `0 0 0 2px ${tokens.dark.focusRing}`,
    },
    '@media (hover: hover)': {
      '& button:hover': {
        backgroundColor: 'oklch(0.269 0 0 / 50%)',
      },
    },
  }),
}));

const Listbox = styled('ul')(({ theme }) => ({
  boxSizing: 'border-box',
  position: 'absolute',
  top: 'calc(100% + 6px)',
  left: 0,
  zIndex: 50,
  width: '100%',
  maxWidth: '100vw',
  maxHeight: 252,
  margin: 0,
  padding: 4,
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  scrollPaddingBlock: 4,
  borderRadius: 10,
  backgroundColor: tokens.light.popover,
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  color: tokens.light.popoverForeground,
  listStyle: 'none',
  outline: `1px solid ${tokens.light.foregroundRing}`,
  transformOrigin: 'var(--transform-origin)',
  transitionDuration: '100ms',
  ...theme.applyStyles('dark', {
    backgroundColor: tokens.dark.popover,
    color: tokens.dark.popoverForeground,
    outlineColor: tokens.dark.foregroundRing,
  }),
}));

const Option = styled('li')(({ theme }) => ({
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  gap: 8,
  borderRadius: 8,
  paddingBlock: 4,
  paddingLeft: 6,
  paddingRight: 32,
  fontSize: 14,
  lineHeight: '20px',
  outline: 0,
  cursor: 'default',
  userSelect: 'none',
  '& svg': {
    position: 'absolute',
    right: 8,
    display: 'flex',
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    flexShrink: 0,
    visibility: 'hidden',
  },
  "&[aria-selected='true']": {
    '& svg': {
      visibility: 'visible',
    },
  },
  [`&.${autocompleteClasses.focused}`]: {
    backgroundColor: tokens.light.accent,
    color: tokens.light.accentForeground,
  },
  ...theme.applyStyles('dark', {
    [`&.${autocompleteClasses.focused}`]: {
      backgroundColor: tokens.dark.accent,
      color: tokens.dark.accentForeground,
    },
  }),
}));

const EmptyOption = styled('li')(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  paddingBlock: 8,
  paddingInline: 0,
  color: tokens.light.mutedForeground,
  fontSize: 14,
  lineHeight: '20px',
  textAlign: 'center',
  ...theme.applyStyles('dark', {
    color: tokens.dark.mutedForeground,
  }),
}));

function CheckIcon(props) {
  return (
    <svg fill="currentColor" width="10" height="10" viewBox="0 0 10 10" {...props}>
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
