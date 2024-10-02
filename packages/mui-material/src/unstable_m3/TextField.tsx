import * as React from 'react';
import { styled } from './zero-styled';

const FormControl = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

const FormLabel = styled('label')(({ theme }) => ({
  fontSize: '0.875rem',
  marginBottom: '0.25rem',
  marginInline: 'var(--Input-padding-x)',
}));

const FloatingLabel = styled('label')(({ theme }) => ({
  position: 'absolute',
  left: 'calc(var(--padding-x) + var(--label-inset))',
  top: 'var(--_top, 50%)',
  fontSize: 'var(--_font-size, 1rem)',
  transform: 'translateY(-50%)',
  transition: 'top 0.1s',
}));

const InputWrapper = styled('div')(({ theme }) => ({
  '--height': '40px',
  '--padding-x': 'var(--Input-padding-x, 0.5rem)',
  '--padding-t': '0',
  '--border-width': '1px',
  '--border-color': '#000',
  '--focused-border-width': '2px',
  '--focused-border-color': 'blue',
  '--label-shrink-size': '0.75rem',
  '--label-shrink-lh': '14px', // label shrink line-height
  '--label-shrink-top': '0.5rem',
  '--label-inset': '2px',

  'div:has(> &)': {
    '--Input-padding-x': '0.5rem',
  },

  display: 'flex',
  boxSizing: 'border-box',
  height: 'var(--height)',
  alignItems: 'center',
  padding: 'var(--padding-t) var(--padding-x) 0',
  position: 'relative',
  border: 'var(--border-width) solid transparent',
  borderColor: 'var(--border-color)',
  outline: 'var(--_outline)',
  outlineOffset: 'calc(-1 * var(--focused-border-width))',
  '&:has(fieldset)': {
    '--label-shrink-top': 'calc((var(--label-shrink-lh) - var(--border-width)) / -2)',
    border: 'none',
  },
  '&:has(input:focus):not(:has(fieldset))': {
    '--_outline': 'var(--focused-border-width) solid var(--focused-border-color)',
  },
  '&:has(label)': {
    '--height': '56px',
    '&:has(input:focus), &:has(input:not(:placeholder-shown))': {
      '--padding-t': 'calc(var(--label-shrink-size) / 2 + var(--label-shrink-top))',
    },
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
  },
  '&:has(input:focus), &:has(input:not(:placeholder-shown)), &:has(input:-webkit-autofill)': {
    '& label': {
      '--_top': 'calc(var(--label-shrink-top) + var(--label-shrink-size) / 2)',
      '--_font-size': 'var(--label-shrink-size)',
    },
  },
}));

const Input = styled('input')(({ theme }) => ({
  font: 'inherit',
  letterSpacing: 'inherit',
  color: 'currentColor',
  border: 0,
  boxSizing: 'content-box',
  background: 'none',
  outline: 0,
  // Make the flex item shrink with Firefox
  minWidth: 0,
  width: '100%',
  // Reset Firefox invalid required input style
  '&:invalid': {
    boxShadow: 'none',
  },
}));

const FormHelperText = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  marginTop: '0.25rem',
  marginInline: 'var(--Input-padding-x)',
}));

const Fieldset = styled('fieldset')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  top: 'var(--label-shrink-top)',
  margin: 0,
  padding: 0,
  border: 'var(--border-width) solid var(--border-color)',
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
  fontSize: 'var(--label-shrink-size)',
  marginLeft: `calc(var(--padding-x) - var(--border-width) - var(--_gutter) + var(--label-inset))` /* border-width and padding */,
  padding: `0 var(--_gutter)`,
  display: 'inline-flex',
  'input:focus ~ fieldset &, input:not(:placeholder-shown) ~ fieldset &': {
    '--_gutter': '3px',
    '--_max-width': 'none',
  },
}));

const TextField = React.forwardRef(function TextField(inProps, ref) {
  const props = { ...inProps };
  const { variant, label, helperText, placeholder = '', ...other } = props;
  const wrapperRef = React.useRef(null);
  const inputRef = React.useRef<null | HTMLInputElement>(null);
  const handleWrapperClick = (event) => {
    const target = event.target;
    if (target === wrapperRef.current && inputRef.current) {
      inputRef.current.focus();
    }
  };

  if (variant === 'filled' || variant === 'outlined') {
    return (
      <FormControl ref={ref} {...other}>
        <InputWrapper ref={wrapperRef} onClick={handleWrapperClick}>
          {label && <FloatingLabel>{label}</FloatingLabel>}
          <Input ref={inputRef} placeholder={placeholder} />
          {variant === 'outlined' && !!label && (
            <Fieldset>
              <Legend>{label}</Legend>
            </Fieldset>
          )}
        </InputWrapper>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }

  return (
    <FormControl ref={ref} {...other}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputWrapper ref={wrapperRef} onClick={handleWrapperClick}>
        <Input ref={inputRef} placeholder={placeholder} />
      </InputWrapper>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
});

export default TextField;
