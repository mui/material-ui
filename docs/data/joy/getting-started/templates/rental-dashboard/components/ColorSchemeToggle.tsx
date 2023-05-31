import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import { ListItem, ListItemButton, ListItemButtonProps } from '@mui/joy';

export default function ColorSchemeToggle({
  onClick,
  sx,
  ...props
}: ListItemButtonProps) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <ListItemButton {...props} sx={sx} disabled />;
  }

  return (
    <ListItem>
      <ListItemButton
        id="toggle-mode"
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          if (mode === 'light') {
            setMode('dark');
          } else {
            setMode('light');
          }
          onClick?.(event);
        }}
        sx={[
          {
            '& > *:first-child': {
              display: mode === 'dark' ? 'none' : 'initial',
            },
            '& > *:last-child': {
              display: mode === 'light' ? 'none' : 'initial',
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <i data-feather="moon" />
        <i data-feather="sun" />
      </ListItemButton>
    </ListItem>
  );
}
