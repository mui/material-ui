import * as React from 'react';
import clsx from 'clsx';
import { unstable_useId } from '@mui/material/utils';
import Box from '@mui/material/Box';
import { Input } from '@mui/base/Input';
import { styled, GlobalStyles } from '@mui/system';

const fieldStyles = `
  --TextInput-height: 64px;
  --TextInput-paddingTop: 2rem;
  --TextInput-labelLineHeight: 20px;
  --TextInput-labelScale: 0.75;
  width: 320px;
  padding: 0px 0.75rem;
  display: inline-flex;
  position: relative;
  height: var(--TextInput-height);
  background: var(--muidocs-palette-background-default);
  border: 1px solid;
  border-color: var(--muidocs-palette-grey-300);
  border-radius: var(--muidocs-shape-borderRadius);
  outline-color: transparent;
  box-shadow: var(--shadow);

  &:hover {
    border-color: var(--muidocs-palette-grey-400);
  }

  &:focus-within {
    border-color: var(--primary);
    outline: 3px solid;
    outline-color: var(--focus-ring);
    & label {
      color: var(--primary) !important;
    }
  }
  & label {
    line-height: var(--TextInput-labelLineHeight);
    position: absolute;
    display: flex;
    align-items: center;
    top: 50%;
    left: 0.75rem;
    overflow: hidden;
    text-align: start;
    text-overflow: ellipsis;
    font-weight: 500;
    color: var(--muidocs-palette-grey-600);
    white-space: nowrap;
    pointer-events: none;
    transform-origin: 0 0;
    transform: translateY(-50%);
    transition: transform 0.1s ease-out;
  }

  :where([data-mui-color-scheme='dark']) & {
    border-color: var(--muidocs-palette-grey-800);
    box-shadow: var(--shadow);

    &:hover {
      border-color: var(--muidocs-palette-grey-700);
    }

    &:focus-within {
      border-color: var(--primary-hover);
      outline-color: var(--focus-ring);
    }
  }
`;

const Field = styled('div')(fieldStyles);

const inputStyles = `
  border: none;
  padding: var(--TextInput-paddingTop) 0 0.75rem;
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
    font-weight: 600;
  }
`;
const StyledInput = styled('input')(inputStyles);

const CSS = `.base-Input-root {${fieldStyles}}

.base-Input-input {${inputStyles}}`;

const StyledFloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  React.JSX.IntrinsicElements['input']
>(function StyledFloatingLabelInput(props, ref) {
  const id = unstable_useId(props.id);
  return (
    <React.Fragment>
      <StyledInput ref={ref} {...props} id={id} />
      <label htmlFor={id}>Floating label</label>
    </React.Fragment>
  );
});

const FloatingLabelInput = React.forwardRef<HTMLInputElement, React.JSX.IntrinsicElements['input']>(
  function FloatingLabelInput(props, ref) {
    const id = unstable_useId(props.id);
    return (
      <React.Fragment>
        <input ref={ref} {...props} id={id} />
        <label htmlFor={id}>Floating label</label>
      </React.Fragment>
    );
  },
);

const TailwindFloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  React.JSX.IntrinsicElements['input']
  // @ts-ignore
>(function TailwindFloatingLabelInput({ ownerState, ...props }, ref) {
  const id = unstable_useId(props.id);
  return (
    <React.Fragment>
      <input
        ref={ref}
        {...props}
        className={clsx(
          'peer h-full flex-1 border-none bg-transparent px-3 pb-[0.75rem] pt-[--TextInput-paddingTop] font-sans text-base placeholder-transparent focus:outline-none focus:ring-0',
          props.className,
        )}
        id={id}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-[0.75rem] top-[50%] flex origin-[0_0] translate-y-[-100%] scale-[--TextInput-labelScale] transform items-center overflow-hidden whitespace-nowrap text-start font-[500] leading-[--TextInput-labelLineHeight] text-[--muidocs-palette-grey-600] transition-transform duration-100 ease-out peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:scale-100 peer-placeholder-shown:transform peer-focus:translate-y-[-100%] peer-focus:scale-[--TextInput-labelScale] peer-focus:transform peer-focus:text-[--primary] "
      >
        Floating label
      </label>
    </React.Fragment>
  );
});

export default function BaseInputDemo({ styling }: { styling?: 'system' | 'tailwindcss' | 'css' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 144,
        gap: 2,
        py: 5,
      }}
    >
      {styling === 'system' && (
        <Input
          placeholder="Type something here"
          slots={{
            root: Field,
            input: StyledFloatingLabelInput,
          }}
        />
      )}
      {styling === 'css' && (
        <React.Fragment>
          <GlobalStyles styles={CSS} />
          <Input placeholder="Type something here" slots={{ input: FloatingLabelInput }} />
        </React.Fragment>
      )}
      {styling === 'tailwindcss' && (
        <Input
          placeholder="Type something here"
          className=" p-[0px_0.75rem][box-shadow:var(--shadow)] relative inline-flex h-[--TextInput-height] w-[320px] rounded-[--muidocs-shape-borderRadius] border border-solid border-[--muidocs-palette-grey-300] bg-[--muidocs-palette-background-default] outline-transparent [--TextInput-height:64px] [--TextInput-labelLineHeight:20px] [--TextInput-labelScale:0.75] [--TextInput-paddingTop:2rem] focus-within:!border-[--primary] focus-within:[outline:3px_solid_var(--focus-ring)] hover:border-[--muidocs-palette-grey-400] dark:border-[--muidocs-palette-grey-800] dark:shadow-[0_2px_4px_0_rgba(0_0_0/0.8)] dark:focus-within:!border-[--primary] dark:focus-within:[outline:3px_solid_var(--focus-ring)] dark:hover:border-[--muidocs-palette-grey-700]"
          slots={{ input: TailwindFloatingLabelInput }}
        />
      )}
    </Box>
  );
}

BaseInputDemo.getCode = (styling?: 'system' | 'tailwindcss' | 'css') => {
  if (styling === 'system') {
    return `import { Input } from '@mui/base/Input';

const Field = styled('div')\`${fieldStyles}\`;
const StyledInput = styled('input')\`${inputStyles}/\`;

const FloatingLabelInput = React.forwardRef<
  HTMLInputElement, React.JSX.IntrinsicElements['input']
>(
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
  if (styling === 'css') {
    return `import { Input } from '@mui/base/Input';
import './styles.css';

const FloatingLabelInput = React.forwardRef<
  HTMLInputElement, React.JSX.IntrinsicElements['input']
>(
  function FloatingLabelInput(props, ref) {
    const id = unstable_useId(props.id);
    return (
      <React.Fragment>
        <input ref={ref} {...props} id={id} />
        <label htmlFor={id}>Floating label</label>
      </React.Fragment>
    );
  },
);

<Input
  placeholder="Placeholder"
  slots={{ input: FloatingLabelInput }}
/>

/* styles.css */
${CSS}
`;
  }
  if (styling === 'tailwindcss') {
    return `import { Input } from '@mui/base/Input';

const FloatingLabelInput = React.forwardRef(
  function FloatingLabelInput({ ownerState, id, ...props }, ref) {
  const id = id || 'floating-label';
  return (
    <React.Fragment>
      <input
        id={id}
        ref={ref}
        {...props}
        className={clsx(
          \`peer h-full flex-1 border-none bg-transparent 
          px-3 pb-[0.75rem] pt-[--TextInput-paddingTop] 
          font-sans text-base placeholder-transparent 
          focus:outline-none focus:ring-0\`,
          props.className,
        )}
        id={id}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-[0.75rem] 
          top-[50%] flex origin-[0_0] translate-y-[-100%] 
          scale-[--TextInput-labelScale] transform items-center 
          overflow-hidden whitespace-nowrap text-start font-[500] 
          leading-[--TextInput-labelLineHeight] 
          text-[--muidocs-palette-grey-600] transition-transform 
          duration-100 ease-out 
          peer-placeholder-shown:translate-y-[-50%] 
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:transform 
          peer-focus:translate-y-[-100%] 
          peer-focus:scale-[--TextInput-labelScale] 
          peer-focus:transform peer-focus:text-[--primary]"
      >
        Floating label
      </label>
    </React.Fragment>
  );
});

<Input
  placeholder="Type something here"
  className="relative inline-flex h-[--TextInput-height] w-[320px] 
    rounded-[--muidocs-shape-borderRadius] border border-solid 
    border-[--muidocs-palette-grey-300] 
    bg-[--muidocs-palette-background-default] 
    p-[0px_0.75rem] [box-shadow:var(--shadow)] 
    outline-transparent [--TextInput-height:64px] 
    [--TextInput-labelLineHeight:20px] [--TextInput-labelScale:0.75] 
    [--TextInput-paddingTop:2rem] 
    focus-within:!border-[--primary] 
    focus-within:[outline:3px_solid_var(--focus-ring)] 
    hover:border-[--muidocs-palette-grey-400] dark:border-transparent 
    dark:shadow-[0_2px_4px_0_rgba(0_0_0/0.8)] 
    dark:focus-within:!border-[--primary] 
    dark:focus-within:[outline:3px_solid_var(--focus-ring)] 
    dark:hover:border-[--muidocs-palette-grey-700]"
  slots={{ input: FloatingLabelInput }}
/>
`;
  }
  return '';
};
