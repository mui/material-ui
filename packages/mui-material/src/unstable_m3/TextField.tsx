import * as React from 'react';
import useId from '@mui/utils/useId';
import { styled } from './zero-styled';

interface TextFieldProps {
  variant?: 'filled' | 'outlined';
  label?: string;
  helperText?: string;
  placeholder?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export const FormControl = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
});

export const FormLabel = styled('label')(({ theme }) => ({
  fontSize: '0.875rem',
  paddingInline: 'var(--Input-padding-x)',
  color: theme.vars.sys['color-on-surface-variant'],
  ...theme.typography['label-large'],
}));

export const FloatingLabel = styled('label')(({ theme }) => ({
  '--_color': theme.vars.sys['color-on-surface-variant'],
  '--_font-size': theme.vars.sys['typescale-body-medium-size'],
  '--_line-height': theme.vars.sys['typescale-body-medium-line-height'],
  position: 'absolute',
  left: 'calc(var(--padding-l) + var(--label-inset) + var(--_start-adornment-inset, 0px))',
  top: 'var(--_top, 50%)',
  transform: 'translateY(-50%)',
  transition: 'all 0.1s',
  ...theme.typography['body-large'],
  fontSize: `var(--_font-size)`,
  lineHeight: `var(--_line-height)`,
  color: 'var(--_color)',
}));

const InputContainer = styled('div')(({ theme }) => ({
  '--height': '40px',
  '--gap': '1rem',
  '--padding-l': 'calc(var(--Input-padding-x, 1rem) - var(--border-width))',
  '--padding-r': 'calc(var(--Input-padding-x, 1rem) - var(--border-width))',
  '--border-width': '1px',
  '--border-color': theme.vars.sys['color-outline'],
  '--focused-border-width': '2px',
  '--focused-border-color': theme.vars.sys['color-primary'],
  '--label-shrink-size': theme.vars.sys['typescale-label-small-size'],
  '--label-shrink-lh': theme.vars.sys['typescale-label-small-line-height'], // label shrink line-height
  '--label-shrink-top': '8px',
  '--label-inset': '0.5px',
  '--border-radius': theme.vars.sys['shape-corner-extra-small'],
  '--start-adornment-size': '1.5rem',
  '--_background': 'transparent',

  'div:has(> &)': {
    '--Input-padding-x': '1rem',
  },

  ...theme.typography['body-large'],
  color: theme.vars.sys['color-on-surface'],
  display: 'flex',
  gap: 'var(--gap)',
  boxSizing: 'border-box',
  height: 'var(--height)',
  alignItems: 'center',
  padding: '0 var(--padding-r) 0 var(--padding-l)',
  position: 'relative',
  borderWidth: 'var(--border-width)',
  borderStyle: 'solid',
  borderColor: 'var(--border-color)',
  borderRadius: 'var(--border-radius)',
  background: 'var(--_background)',
  outline: 'var(--_outline)',
  outlineOffset: 'calc(-1 * var(--focused-border-width))',
  '&:has(input:focus)': {
    '--_outline': `var(--focused-border-width) solid ${theme.vars.sys['color-primary']}`,
  },
  // floating label
  '&:has(label)': {
    '--border-radius': theme.vars.sys['shape-corner-extra-small-top'],
    '--height': '56px',
    '& input': {
      '&::placeholder': {
        opacity: 0,
      },
      '&:focus': {
        '&::placeholder': {
          opacity: 1,
        },
      },
    },
    '&:has(input:focus), &:has(input:not(:placeholder-shown)), &:has(input:-webkit-autofill)': {
      '--_outline': 'none',
      '& label': {
        '--_color': theme.vars.sys['color-primary'],
        '--_top': 'calc(var(--label-shrink-top) + var(--label-shrink-lh) / 2)',
        '--_font-size': 'var(--label-shrink-size)',
        '--_line-height': 'var(--label-shrink-lh)',
      },
    },
  },
  // filled variant
  '&:has(label):not(:has(fieldset))': {
    '--border-width': '0px',
    '--_background': theme.vars.sys['color-surface-container-highest'],
    '& input': {
      '--_padding-t': 'calc(var(--label-shrink-top) + var(--label-shrink-lh) / 2)',
    },
  },
  // outlined variant
  '&:has(fieldset)': {
    '--label-shrink-top': 'calc(var(--label-shrink-lh) / -2 + var(--border-width))',
    '--border-radius': theme.vars.sys['shape-corner-extra-small'],
    border: 'none',
  },
}));

const HtmlInput = styled('input')(({ theme }) => ({
  '--_padding-t': '0px',
  caretColor: theme.vars.sys['color-primary'],
  font: 'inherit',
  letterSpacing: 'inherit',
  color: 'currentColor',
  boxSizing: 'content-box',
  background: 'none',
  border: 0,
  padding: 0,
  paddingTop: 'var(--_padding-t)',
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
}));

export const InputAdornment = styled('div')({
  '--_margin-top': '0px',
  display: 'flex',
  alignItems: 'center',
  marginTop: 'var(--_margin-top)',
  minWidth: 'var(--_min-width)',
  '&:has(> &)': {
    display: 'contents',
  },
  '&:first-child': {
    '--_min-width': 'var(--start-adornment-size)',
  },
  'div:has(> &:first-child)': {
    '--padding-l': 'calc(0.75rem - var(--border-width))',
    '--_start-adornment-inset': 'calc(var(--start-adornment-size, 1.5rem) + var(--gap))',
  },
  'div:has(> &:last-child)': {
    '--padding-r': 'calc(0.75rem - var(--border-width))',
  },
});

export const FormHelperText = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  paddingInline: 'var(--Input-padding-x)',
  display: 'flex',
  gap: '1rem',
  justifyContent: 'space-between',
  ...theme.typography['body-small'],
  color: theme.vars.sys['color-on-surface-variant'],
}));

export const ActiveIndicator = styled('div')(({ theme }) => ({
  '--_height': '1px',
  '--_background': theme.vars.sys['color-on-surface-variant'],
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 'var(--_height)',
  background: 'var(--_background)',
  transition: 'height 0.1s',
  'input:focus ~ &': {
    '--_height': 'var(--focused-border-width)',
    '--_background': 'var(--focused-border-color)',
  },
}));

const Fieldset = styled('fieldset')(({ theme }) => ({
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
    '--border-color': 'var(--focused-border-color)',
  },
}));

const Legend = styled('legend')(({ theme }) => ({
  '--_gutter': '0px',
  '--_max-width': '0.01px',
  visibility: 'hidden',
  maxWidth: 'var(--_max-width)',
  marginLeft: `calc(var(--padding-l) - var(--border-width) - var(--_gutter) + var(--label-inset))` /* border-width and padding */,
  padding: `0 var(--_gutter)`,
  display: 'inline-flex',
  ...theme.typography['body-large'],
  fontSize: `var(--label-shrink-size)`,
  lineHeight: `var(--label-shrink-lh)`,
  'input:focus ~ fieldset &, input:not(:placeholder-shown) ~ fieldset &': {
    '--_gutter': '3px',
    '--_max-width': 'none',
  },
  '&:has(.notranslate)': {
    '--_max-width': '0.01px !important',
    '--_gutter': '0px !important',
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
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
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
    <InputContainer ref={wrapperRef} onClick={handleWrapperClick} {...props}>
      {startAdornment && <InputAdornment>{startAdornment}</InputAdornment>}
      <HtmlInput id={id} ref={inputRef} placeholder={placeholder} />
      {endAdornment && <InputAdornment>{endAdornment}</InputAdornment>}
    </InputContainer>
  );
}

export function FilledInput({
  placeholder = '',
  label,
  startAdornment,
  endAdornment,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
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
    <InputContainer ref={wrapperRef} onClick={handleWrapperClick} {...props}>
      {startAdornment && <InputAdornment>{startAdornment}</InputAdornment>}
      {label && <FloatingLabel htmlFor={id}>{label}</FloatingLabel>}
      <HtmlInput id={id} ref={inputRef} placeholder={placeholder} />
      <ActiveIndicator />
      {endAdornment && <InputAdornment>{endAdornment}</InputAdornment>}
    </InputContainer>
  );
}

export function OutlinedInput({
  placeholder = '',
  label,
  startAdornment,
  endAdornment,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
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
    <InputContainer ref={wrapperRef} onClick={handleWrapperClick} {...props}>
      {startAdornment && <InputAdornment>{startAdornment}</InputAdornment>}
      {label && <FloatingLabel htmlFor={id}>{label}</FloatingLabel>}
      <HtmlInput id={id} ref={inputRef} placeholder={placeholder} />
      <Outline label={label} />
      {endAdornment && <InputAdornment>{endAdornment}</InputAdornment>}
    </InputContainer>
  );
}

const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(
  function TextField(inProps, ref) {
    const id = useId();
    const props = { ...inProps };
    const {
      variant,
      label,
      helperText,
      placeholder = '',
      startAdornment,
      endAdornment,
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
      <FormControl ref={ref} {...other}>
        {!variant && label && <FormLabel htmlFor={id}>{label}</FormLabel>}
        <InputContainer ref={wrapperRef} onClick={handleWrapperClick}>
          {startAdornment && <InputAdornment>{startAdornment}</InputAdornment>}
          {(variant === 'outlined' || variant === 'filled') && label && (
            <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
          )}
          <HtmlInput id={id} ref={inputRef} placeholder={placeholder} />
          {variant === 'outlined' && label && <Outline label={label} />}
          {variant === 'filled' && <ActiveIndicator />}
          {endAdornment && <InputAdornment>{endAdornment}</InputAdornment>}
        </InputContainer>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  },
);

export default TextField;
