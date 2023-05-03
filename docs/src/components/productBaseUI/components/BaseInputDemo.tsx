import * as React from 'react';
import { unstable_useId } from '@mui/material/utils';
import Box from '@mui/material/Box';
import InputUnstyled from '@mui/base/Input';
import { styled } from '@mui/system';

const Field = styled('div')`
  --TextInput-height: 64px;
  --TextInput-paddingTop: 2rem;
  --TextInput-labelLineHeight: 18px;
  --TextInput-labelScale: 0.75;
  width: 320px;
  padding: 0px 0.75rem;
  display: inline-flex;
  position: relative;
  height: var(--TextInput-height);
  background: var(--muidocs-palette-background-paper);
  border: 1px solid;
  border-color: var(--muidocs-palette-primary-100);
  border-radius: var(--muidocs-shape-borderRadius);
  outline-color: transparent;
  &:focus-within {
    border-color: var(--muidocs-palette-primary-400);
    outline: 3px solid;
    outline-color: var(--muidocs-palette-primary-100);
    & svg {
      opacity: 1;
      color: var(--muidocs-palette-grey-600);
    }
  }
  & label {
    line-height: var(--TextInput-labelLineHeight);
    position: absolute;
    display: flex;
    align-items: center;
    top: 50%;
    left: calc(0.75rem - 1px);
    overflow: hidden;
    text-align: start;
    text-overflow: ellipsis;
    font-weight: 500;
    color: var(--muidocs-palette-grey-500);
    white-space: nowrap;
    pointer-events: none;
    border: 1px solid transparent;
    transform-origin: 0 0;
    transform: translateY(-50%);
    transition: transform 0.1s ease-out;
  }
  & svg {
    align-self: center;
    color: var(--muidocs-palette-grey-500);
    opacity: 0;
  }

  :where([data-mui-color-scheme='dark']) & {
    border-color: var(--muidocs-palette-primary-900);

    &:focus-within {
      border-color: var(--muidocs-palette-primary-500);
      outline-color: var(--muidocs-palette-primary-800);

      & svg {
        color: var(--muidocs-palette-primaryDark-300);
      }
    }
  }
`;
const StyledInput = styled('input')`
  border: none;
  padding: var(--TextInput-paddingTop) 0 0.25rem;
  height: 100%;
  font-size: 1rem;
  background: unset;
  flex: 1;
  &:focus {
    outline: none;
  }
  &:not(:focus)::placeholder {
    color: transparent;
  }
  &:not(:placeholder-shown) ~ label,
  &:focus ~ label {
    transform: translateY(-100%) scale(var(--TextInput-labelScale));
  }
`;

const FloatingLabelInput = React.forwardRef<HTMLInputElement, JSX.IntrinsicElements['input']>(
  function FloatingLabelInput(props, ref) {
    const id = unstable_useId(props.id);
    return (
      <React.Fragment>
        <StyledInput ref={ref} {...props} id={id} />
        <label htmlFor={id}>Floating label</label>
      </React.Fragment>
    );
  },
);

export default function BaseInputDemo({ styling }: { styling?: 'system' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        height: '100%',
        py: 2,
      }}
    >
      <InputUnstyled
        placeholder="Placeholder"
        slots={{
          root: !styling ? undefined : Field,
          input: !styling ? undefined : FloatingLabelInput,
        }}
      />
    </Box>
  );
}

BaseInputDemo.getCode = (styling?: 'system') => {
  if (styling === 'system') {
    return `import Input from '@mui/base/Input';
    
const Field = styled('div')\`/* CSS… */\`;
const StyledInput = styled('input')\`/* CSS… */\`;

const FloatingLabelInput = React.forwardRef<HTMLInputElement, JSX.IntrinsicElements['input']>(
  function FloatingLabelInput(props, ref) {
    const id = unstable_useId(props.id);
    return (
      <React.Fragment>
        <StyledInput ref={ref} {...props} id={id} />
        <label htmlFor={id}>Floating label</label>
      </React.Fragment>
    );
  },
);

<Input
  placeholder="Placeholder"
  slots={{
    root: Field,
    input: FloatingLabelInput,
  }}
/>
`;
  }
  return `import Input from '@mui/base/Input';

<Input placeholder="Placeholder"/>
`;
};
