import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/base/Button';
import { styled, GlobalStyles } from '@mui/system';

const buttonStyles = `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background: var(--primary);
  padding: 10px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  box-shadow: var(--shadow);

  &:hover {
    background: var(--primary-hover);
  }

  &.Mui-active {
    background: var(--primary-active);
  }

  &.Mui-focusVisible {
    outline: 3px solid var(--focus-ring);
    outline-offset: 2px;
  }

  &.Mui-disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background: var(--primary);
    }
  }
`;

const StyledButton = styled('button')(buttonStyles);

const buttonStylesTailwind = `cursor-pointer rounded-[8px] border-none bg-[--primary] p-[10px_16px] text-[0.875rem] font-bold text-white [font-family:IBM_Plex_sans] hover:bg-[--primary-hover] ui-active:bg-[--primary-active] ui-disabled:cursor-not-allowed ui-disabled:opacity-50 ui-focus-visible:[outline:3px_solid_var(--focus-ring)] outline-offset-2 transition shadow-[--shadow]`;

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
          <GlobalStyles styles={`.MuiButton-root {${buttonStyles}}`} />
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
.MuiButton-root {${buttonStyles}}
`;
  }
  if (styling === 'tailwindcss') {
    return `import { Button } from '@mui/base/Button';

<Button
  className="transition shadow-[--shadow] cursor-pointer rounded-[8px] 
  border-none bg-indigo-600 p-[10px_16px] text-[0.875rem] font-bold 
  text-white [font-family:IBM_Plex_sans] hover:bg-indigo-500 
  ui-active:bg-indigo-800 ui-disabled:cursor-not-allowed ui-disabled:opacity-50 
  ui-focus-visible:[outline:4px_solid_var(--focus-ring)] outline-offset-2">
  Button
</Button>
<Button
  className="transition shadow-[--shadow] cursor-pointer rounded-[8px] 
  border-none bg-indigo-600 p-[10px_16px] text-[0.875rem] font-bold 
  text-white [font-family:IBM_Plex_sans] hover:bg-indigo-500 
  ui-active:bg-indigo-800 ui-disabled:cursor-not-allowed ui-disabled:opacity-50 
  ui-focus-visible:[outline:4px_solid_var(--focus-ring)] outline-offset-2">
  Disabled
</Button>`;
  }
  return ``;
};
