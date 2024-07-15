import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/base/Button';
import { styled, GlobalStyles } from '@mui/system';

const buttonStyles = `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background: var(--primary);
  padding: 6px 12px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  box-shadow: var(--solid-btn-shadow);
  user-select: none;

  &:hover {
    background: var(--primary-hover);
    box-shadow: none;
  }

  &.base--active {
    background: var(--primary-active);
  }

  &.base--focusVisible {
    outline: 3px solid var(--focus-ring);
    outline-offset: 2px;
  }

  &.base--disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background: var(--primary);
      box-shadow: var(--solid-btn-shadow);
    }
  }
`;

const StyledButton = styled('button')(buttonStyles);

const buttonStylesTailwind = `cursor-pointer select-none rounded-[8px] border-none bg-[--primary] p-[6px_12px] text-[0.875rem] leading-[1.5] font-bold text-white [font-family:IBM_Plex_sans] hover:bg-[--primary-hover] ui-active:bg-[--primary-active] ui-disabled:cursor-not-allowed ui-disabled:opacity-50 ui-disabled:hover:bg-[--primary] ui-disabled:[box-shadow:var(--solid-btn-shadow)] ui-focus-visible:[outline:3px_solid_var(--focus-ring)] outline-offset-2 transition [box-shadow:var(--solid-btn-shadow)] hover:[box-shadow:none]`;

export default function BaseButtonDemo({
  styling,
}: {
  styling?: 'system' | 'tailwindcss' | 'css';
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 144,
        gap: 2,
        py: 3,
      }}
    >
      {styling === 'system' && (
        <React.Fragment>
          <Button slots={{ root: StyledButton }}>Button</Button>
          <Button disabled slots={{ root: StyledButton }}>
            Disabled
          </Button>
        </React.Fragment>
      )}
      {styling === 'css' && (
        <React.Fragment>
          <GlobalStyles styles={`.base-Button-root {${buttonStyles}}`} />
          <Button>Button</Button>
          <Button disabled>Disabled</Button>
        </React.Fragment>
      )}
      {styling === 'tailwindcss' && (
        <React.Fragment>
          <Button className={buttonStylesTailwind}>Button</Button>
          <Button className={buttonStylesTailwind} disabled>
            Disabled
          </Button>
        </React.Fragment>
      )}
    </Box>
  );
}
BaseButtonDemo.getCode = (styling?: 'system' | 'tailwindcss' | 'css') => {
  if (styling === 'system') {
    return `import { Button } from '@mui/base/Button';
import { styled } from '@mui/system';

const StyledButton = styled('button')\`${buttonStyles}\`;

<Button slots={{ root: StyledButton }}>Button</Button>
<Button slots={{ root: StyledButton }}>Disabled</Button>
`;
  }
  if (styling === 'css') {
    return `import { Button } from '@mui/base/Button';
import './styles.css';

<Button>Button</Button>
<Button disabled>Disabled</Button>

/* styles.css */
.base-Button-root {${buttonStyles}}
`;
  }
  if (styling === 'tailwindcss') {
    return `import { Button } from '@mui/base/Button';

<Button
  className="cursor-pointer select-none rounded-[8px] 
  border-none bg-indigo-600 p-[6px_12px] text-[0.875rem] leading-[1.5] font-bold 
  text-white [font-family:IBM_Plex_sans] hover:bg-indigo-500 
  ui-active:bg-indigo-800 ui-disabled:cursor-not-allowed ui-disabled:opacity-50 
  ui-focus-visible:[outline:4px_solid_var(--focus-ring)] outline-offset-2 
  transition [box-shadow:var(--solid-btn-shadow)] hover:[box-shadow:none]
  ui-disabled:hover:bg-[--primary] ui-disabled:[box-shadow:var(--solid-btn-shadow)]">
  Button
</Button>
<Button
  className="cursor-pointer select-none rounded-[8px] 
  border-none bg-indigo-600 p-[6px_12px] text-[0.875rem] leading-[1.5] font-bold 
  text-white [font-family:IBM_Plex_sans] hover:bg-indigo-500 
  ui-active:bg-indigo-800 ui-disabled:cursor-not-allowed ui-disabled:opacity-50 
  ui-focus-visible:[outline:4px_solid_var(--focus-ring)] outline-offset-2 
  transition [box-shadow:var(--solid-btn-shadow)] hover:[box-shadow:none]
  ui-disabled:hover:bg-[--primary] ui-disabled:[box-shadow:var(--solid-btn-shadow)]">
  Disabled
</Button>`;
  }
  return ``;
};
