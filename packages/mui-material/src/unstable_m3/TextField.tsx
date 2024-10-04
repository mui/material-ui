import * as React from 'react';
import useId from '@mui/utils/useId';
import { SxProps } from '@mui/system';
import clsx from 'clsx';
import { styled } from './zero-styled';
import { ThemeM3 } from './theme';

interface TextFieldProps {
  variant?: 'filled' | 'outlined';
  label?: string;
  helperText?: string;
  placeholder?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  disabled?: boolean;
  value?: string;
  error?: boolean;
  sx?: SxProps<ThemeM3>;
}

export const FormControl = styled('div')(({ theme }) => ({
  '@layer FormControl': {
    '--i-padding-inline': '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  '@layer FormControl-disabled': {
    '&:has(input:disabled)': {
      '--i-opacity': 0.38,
      '--i-disabled-color': `color-mix(in srgb, ${theme.vars.sys['color-on-surface']} calc(100% * var(--i-opacity)), transparent)`,
    },
  },
}));

export const FormLabel = styled('label')(({ theme }) => ({
  '@layer FormLabel': {
    '--color': theme.vars.sys['color-on-surface-variant'],
    fontSize: '0.875rem',
    paddingInline: 'var(--i-padding-inline)',
    color: 'var(--color)',
    opacity: 'var(--i-opacity)',
    ...theme.typography['label-large'],
  },
  '@layer FormLabel-error': {
    '.Mui-error &': {
      '--color': theme.vars.sys['color-error'],
    },
  },
}));

export const FloatingLabel = styled('label')(({ theme }) => ({
  '@layer FloatingLabel': {
    '--color': theme.vars.sys['color-on-surface-variant'],
    '--font-size': theme.vars.sys['typescale-body-medium-size'],
    '--line-height': theme.vars.sys['typescale-body-medium-line-height'],
    position: 'absolute',
    left: 'calc(var(--padding-left) + var(--label-inset) + var(--_start-adornment-inset, 0px))',
    top: 'var(--top, 50%)',
    transform: 'translateY(-50%)',
    transition: 'all 0.1s',
    ...theme.typography['body-large'],
    fontSize: `var(--font-size)`,
    lineHeight: `var(--line-height)`,
    color: 'var(--i-disabled-color, var(--color))',
    '&:has(~ input:disabled)': {
      '--color': 'var(--i-disabled-color)',
    },
    '&:has(~ input:focus), &:has(~ input:not(:placeholder-shown)), &:has(~ input:-webkit-autofill)':
      {
        '--color': theme.vars.sys['color-primary'],
        '--top': 'calc(var(--label-shrink-top) + var(--label-shrink-line-height) / 2)',
        '--font-size': 'var(--label-shrink-font-size)',
        '--line-height': 'var(--label-shrink-line-height)',
      },
  },
  '@layer FloatingLabel-error': {
    '.Mui-error &': {
      '--color': theme.vars.sys['color-error'],
    },
  },
}));

const InputContainer = styled('div')(({ theme }) => ({
  '@layer Input': {
    '--height': '40px',
    '--gap': '1rem',
    '--padding-left': 'calc(var(--i-padding-inline, 1rem) - var(--border-width))',
    '--padding-right': 'calc(var(--i-padding-inline, 1rem) - var(--border-width))',
    '--border-width': '1px',
    '--border-color': theme.vars.sys['color-outline'],
    '--border-radius': theme.vars.sys['shape-corner-extra-small'],
    '--background': 'transparent',
    '--color': theme.vars.sys['color-on-surface'],
    '--focused-border-width': '2px',
    '--focused-border-color': theme.vars.sys['color-primary'],
    '--label-shrink-font-size': theme.vars.sys['typescale-label-small-size'],
    '--label-shrink-line-height': theme.vars.sys['typescale-label-small-line-height'], // label shrink line-height
    '--label-shrink-top': '8px',
    '--label-inset': '0.5px',
    '--start-adornment-min-width': '1.5rem',
    '--placeholder-opacity': 0,

    ...theme.typography['body-large'],
    color: 'var(--color)',
    display: 'flex',
    gap: 'var(--gap)',
    boxSizing: 'border-box',
    height: 'var(--height)',
    alignItems: 'center',
    padding: '0 var(--padding-right) 0 var(--padding-left)',
    position: 'relative',
    borderWidth: 'var(--border-width)',
    borderStyle: 'solid',
    borderColor: 'var(--border-color)',
    borderRadius: 'var(--border-radius)',
    background: 'var(--background)',
    outline: 'var(--outline)',
    outlineOffset: 'calc(-1 * var(--focused-border-width))',
    transition: '0.2s',
    '&:hover': {
      '--border-color': theme.vars.sys['color-on-surface'],
    },
    '.Mui-error &': {
      '--border-color': theme.vars.sys['color-error'],
    },
    '&:has(input:focus)': {
      '--outline': `var(--focused-border-width) solid ${theme.vars.sys['color-primary']}`,
      '.Mui-error &': {
        '--outline': `var(--focused-border-width) solid ${theme.vars.sys['color-error']}`,
      },
    },
    '&:has(input:disabled)': {
      '--background': `color-mix(in srgb, ${theme.vars.sys['color-on-surface']} 4%, transparent)`,
      '--color': 'var(--i-disabled-color)',
    },
    // floating label
    '&:has(label)': {
      '--border-radius': theme.vars.sys['shape-corner-extra-small-top'],
      '& input': {
        '&::placeholder': {
          opacity: 'var(--placeholder-opacity)',
        },
        '&:focus': {
          '--placeholder-opacity': 1,
        },
      },
      '&:has(input:focus), &:has(input:not(:placeholder-shown)), &:has(input:-webkit-autofill)': {
        '--outline': 'none',
      },
    },
  },
  // filled variant
  '@layer Input-filled': {
    '&:has(label):not(:has(fieldset))': {
      '--outline': 'none',
      '--height': '56px',
      '--border-width': '0px',
      '--background': theme.vars.sys['color-surface-container-highest'],
      '&:hover': {
        '--background': `color-mix(in srgb, ${theme.vars.sys['color-surface-container-highest']}, ${theme.vars.sys['color-on-surface']} 8%)`,
      },
      '&:has(input:disabled)': {
        '--background': `color-mix(in srgb, ${theme.vars.sys['color-on-surface']} 4%, transparent)`,
      },
    },
  },
  // outlined variant
  '@layer Input-outlined': {
    '&:has(fieldset)': {
      '--outline': 'none',
      '--height': '56px',
      '--label-shrink-top': 'calc(var(--label-shrink-line-height) / -2 + var(--border-width))',
      '--border-radius': theme.vars.sys['shape-corner-extra-small'],
      border: 'none',
      '&:hover': {
        '--border-color': theme.vars.sys['color-on-surface'],
      },
    },
  },
}));

const HtmlInput = styled('input')(({ theme }) => ({
  '--padding-top': '0px',
  '--caret-color': theme.vars.sys['color-primary'],
  caretColor: 'var(--caret-color)',
  font: 'inherit',
  letterSpacing: 'inherit',
  color: 'currentColor',
  boxSizing: 'content-box',
  background: 'none',
  border: 0,
  padding: 0,
  paddingTop: 'var(--padding-top)',
  outline: 0,
  // Make the flex item shrink with Firefox
  minWidth: 0,
  width: '100%',
  // Reset Firefox invalid required input style
  '&:invalid': {
    boxShadow: 'none',
  },
  '&::-webkit-search-decoration': {
    // Remove the padding when type=search.
    WebkitAppearance: 'none',
  },
  ':-webkit-autofill, :-webkit-autofill:focus': {
    transition: 'background-color 0s 600000s, color 0s 600000s !important',
  },
  'label ~ &:not(:has(~ fieldset))': {
    '--padding-top': 'calc(var(--label-shrink-top) + var(--label-shrink-line-height) / 2)',
  },
  '.Mui-error &': {
    '--caret-color': theme.vars.sys['color-error'],
  },
}));

export const InputAdornment = styled('div')(({ theme }) => ({
  '@layer InputAdornment': {
    '--_margin-top': '0px',
    '--color': 'currentColor',
    display: 'flex',
    alignItems: 'center',
    marginTop: 'var(--_margin-top)',
    minWidth: 'var(--_min-width)',
    opacity: 'var(--i-opacity)',
    color: 'var(--color)',
    '&:has(> &)': {
      display: 'contents',
    },
    '&[data-first-child]': {
      '--_min-width': 'var(--start-adornment-min-width)',
    },
    'div:has(> &[data-first-child])': {
      '--padding-left': 'calc(0.75rem - var(--border-width))',
      '--_start-adornment-inset': 'calc(var(--start-adornment-min-width, 1.5rem) + var(--gap))',
    },
    'div:has(> &[data-last-child])': {
      '--padding-right': 'calc(0.75rem - var(--border-width))',
    },
  },
  '@layer InputAdornment-error': {
    '.Mui-error &[data-last-child]': {
      '--color': theme.vars.sys['color-error'],
    },
  },
}));

export const FormHelperText = styled('span')(({ theme }) => ({
  '@layer FormHelperText': {
    '--color': theme.vars.sys['color-on-surface-variant'],
    fontSize: '0.875rem',
    paddingInline: 'var(--i-padding-inline)',
    display: 'flex',
    gap: '1rem',
    justifyContent: 'space-between',
    ...theme.typography['body-small'],
    color: 'var(--color)',
    opacity: 'var(--i-opacity)',
  },
  '@layer FormHelperText-error': {
    '.Mui-error &': {
      '--color': theme.vars.sys['color-error'],
    },
  },
}));

export const ActiveIndicator = styled('div')(({ theme }) => ({
  '@layer ActiveIndicator': {
    '--_height': '1px',
    '--background': theme.vars.sys['color-on-surface-variant'],
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 'var(--_height)',
    background: 'var(--background)',
    transition: 'height 0.1s',
    'input:focus ~ &': {
      '--_height': 'var(--focused-border-width)',
      '--background': 'var(--focused-border-color)',
    },
  },
  '@layer ActiveIndicator-error': {
    '.Mui-error:has(input) &': {
      '--background': theme.vars.sys['color-error'],
    },
  },
  '@layer ActiveIndicator-disabled': {
    'input:disabled ~ &': {
      '--background': 'var(--i-disabled-color)',
    },
  },
}));

const Fieldset = styled('fieldset')(({ theme }) => ({
  '@layer Outline': {
    position: 'absolute',
    inset: 0,
    top: 'calc(var(--label-shrink-top))',
    margin: 0,
    padding: 0,
    border: 'var(--border-width) solid var(--border-color)',
    borderRadius: theme.vars.sys['shape-corner-extra-small'],
    pointerEvents: 'none',
    'input:focus ~ &': {
      '--border-width': 'var(--focused-border-width)',
      '--border-color': theme.vars.sys['color-primary'],
    },
  },
  '@layer Outline-error': {
    '.Mui-error input ~ &': {
      '--border-color': theme.vars.sys['color-error'],
    },
  },
  '@layer Outline-disabled': {
    'input:disabled ~ &': {
      '--border-color': `color-mix(in srgb, ${theme.vars.sys['color-on-surface']} 12%, transparent)`,
    },
  },
}));

const Legend = styled('legend')(({ theme }) => ({
  '@layer Outline': {
    '--_gutter': '0px',
    '--_max-width': '0.01px',
    visibility: 'hidden',
    maxWidth: 'var(--_max-width)',
    marginLeft: `calc(var(--padding-left) - var(--border-width) - var(--_gutter) + var(--label-inset))` /* border-width and padding */,
    padding: `0 var(--_gutter)`,
    display: 'inline-flex',
    ...theme.typography['body-large'],
    fontSize: `var(--label-shrink-font-size)`,
    lineHeight: `var(--label-shrink-line-height)`,
    'input:focus ~ fieldset &, input:not(:placeholder-shown) ~ fieldset &': {
      '--_gutter': '3px',
      '--_max-width': 'none',
    },
    '&:has(.notranslate)': {
      '--_max-width': '0.01px !important',
      '--_gutter': '0px !important',
    },
  },
}));

export function Outline({ label }: { label: string }) {
  const withLabel = label != null && label !== '';
  return (
    <Fieldset>
      <Legend>
        {/* Use the nominal use case of the legend, avoid rendering artefacts. */}
        {withLabel ? (
          label
        ) : (
          // notranslate needed while Google Translate will not fix zero-width space issue
          <span className="notranslate">&#8203;</span>
        )}
      </Legend>
    </Fieldset>
  );
}

export function Input({
  placeholder,
  startAdornment,
  endAdornment,
  disabled,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  sx?: SxProps<ThemeM3>;
}) {
  const id = useId();
  const wrapperRef = React.useRef(null);
  const inputRef = React.useRef<null | HTMLInputElement>(null);
  const handleWrapperClick = (event) => {
    const target = event.target;
    if (target === wrapperRef.current && inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <InputContainer
      className={clsx(error && 'Mui-error')}
      ref={wrapperRef}
      onClick={handleWrapperClick}
      {...props}
    >
      {startAdornment && <InputAdornment data-first-child>{startAdornment}</InputAdornment>}
      <HtmlInput id={id} ref={inputRef} disabled={disabled} placeholder={placeholder} />
      {endAdornment && <InputAdornment data-last-child>{endAdornment}</InputAdornment>}
    </InputContainer>
  );
}

export function FilledInput({
  placeholder = '',
  label,
  startAdornment,
  endAdornment,
  disabled,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  sx?: SxProps<ThemeM3>;
}) {
  const id = useId();
  const wrapperRef = React.useRef(null);
  const inputRef = React.useRef<null | HTMLInputElement>(null);
  const handleWrapperClick = (event) => {
    const target = event.target;
    if (target === wrapperRef.current && inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <InputContainer
      className={clsx(error && 'Mui-error')}
      ref={wrapperRef}
      onClick={handleWrapperClick}
      {...props}
    >
      {startAdornment && <InputAdornment data-first-child>{startAdornment}</InputAdornment>}
      {label && <FloatingLabel htmlFor={id}>{label}</FloatingLabel>}
      <HtmlInput id={id} ref={inputRef} disabled={disabled} placeholder={placeholder} />
      <ActiveIndicator />
      {endAdornment && <InputAdornment data-last-child>{endAdornment}</InputAdornment>}
    </InputContainer>
  );
}

export function OutlinedInput({
  placeholder = '',
  label,
  startAdornment,
  endAdornment,
  disabled,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  sx?: SxProps<ThemeM3>;
}) {
  const id = useId();
  const wrapperRef = React.useRef(null);
  const inputRef = React.useRef<null | HTMLInputElement>(null);
  const handleWrapperClick = (event) => {
    const target = event.target;
    if (target === wrapperRef.current && inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <InputContainer
      className={clsx(error && 'Mui-error')}
      ref={wrapperRef}
      onClick={handleWrapperClick}
      {...props}
    >
      {startAdornment && <InputAdornment data-first-child>{startAdornment}</InputAdornment>}
      {label && <FloatingLabel htmlFor={id}>{label}</FloatingLabel>}
      <HtmlInput id={id} ref={inputRef} disabled={disabled} placeholder={placeholder} />
      <Outline label={label} />
      {endAdornment && <InputAdornment data-last-child>{endAdornment}</InputAdornment>}
    </InputContainer>
  );
}

const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(
  function TextField(inProps, ref) {
    const id = useId();
    const props = { ...inProps };
    const {
      variant = 'outlined',
      label,
      helperText,
      placeholder = '',
      disabled,
      startAdornment,
      endAdornment,
      value,
      error,
      ...other
    } = props;
    const wrapperRef = React.useRef(null);
    const inputRef = React.useRef<null | HTMLInputElement>(null);
    const handleWrapperClick = (event) => {
      const target = event.target;
      if (target === wrapperRef.current && inputRef.current) {
        inputRef.current.focus();
      }
    };

    return (
      <FormControl className={clsx(error && 'Mui-error')} ref={ref} {...other}>
        {!variant && label && (
          <FormLabel className="MuiFormLabel-root" htmlFor={id}>
            {label}
          </FormLabel>
        )}
        <InputContainer ref={wrapperRef} onClick={handleWrapperClick}>
          {startAdornment && <InputAdornment data-first-child>{startAdornment}</InputAdornment>}
          {(variant === 'outlined' || variant === 'filled') && label && (
            <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
          )}
          <HtmlInput
            id={id}
            disabled={disabled}
            ref={inputRef}
            placeholder={placeholder}
            value={value}
          />
          {variant === 'outlined' && label && <Outline label={label} />}
          {variant === 'filled' && <ActiveIndicator />}
          {endAdornment && <InputAdornment data-last-child>{endAdornment}</InputAdornment>}
        </InputContainer>
        {helperText && (
          <FormHelperText className="FormHelperText-root">{helperText}</FormHelperText>
        )}
      </FormControl>
    );
  },
);

export default TextField;
