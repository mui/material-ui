import * as React from 'react';
import { useTheme } from '@mui/material/styles';

export default function BaseButtonTailwind() {
  const theme = useTheme();

  const sandboxId =
    theme.palette.mode === 'dark'
      ? 'baseui-cra-tailwind-example-dark-f6dc9z'
      : 'baseui-cra-tailwind-example-light-43zxqe';

  return (
    <iframe
      title="codesandbox"
      src={`https://codesandbox.io/embed/${sandboxId}?fontsize=12&view=preview`}
      style={{
        width: '100%',
        height: 350,
        border: 0,
      }}
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
    />
  );
}
