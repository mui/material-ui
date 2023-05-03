import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/base/Button';
import { styled } from '@mui/system';

const StyledButton = styled('button')`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: var(--muidocs-palette-primary-500);
  padding: 10px 16px;
  border-radius: 12px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &.Mui-active {
    background-color: var(--muidocs-palette-primary-600);
  }

  &.Mui-focusVisible {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.Mui-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function BaseButtonDemo({ styling }: { styling?: 'system' }) {
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
      <Button {...(styling === 'system' && { slots: { root: StyledButton } })}>Button</Button>
      <Button disabled {...(styling === 'system' && { slots: { root: StyledButton } })}>
        Disabled
      </Button>
    </Box>
  );
}
BaseButtonDemo.getCode = (styling?: 'system') => {
  if (styling === 'system') {
    return `import Button from '@mui/base/Button';
import { styled } from '@mui/system';

const StyledButton = styled('button')\`/* CSS… */\`;

<Button slots={{ root: StyledButton }}>Button</Button>
`;
  }
  return `import Button from '@mui/base/Button';

<Button>Button</Button>
`;
};
