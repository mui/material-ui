import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default function ButtonThemes() {
  // the `node` is used for attaching CSS variables to this demo, you might not need it in your app.
  const [node, setNode] = React.useState(null);
  useEnhancedEffect(() => {
    setNode(document.getElementById('dark-mode-by-default'));
  }, []);

  return (
    <CssVarsProvider
      defaultMode="dark"
      // these props are specific to this demo, you might not need them in your app.
      colorSchemeNode={node || null}
      colorSchemeSelector="#dark-mode-by-default"
      modeStorageKey="dark-mode-by-default"
      colorSchemeStorageKey="dark-mode-by-default"
    >
      <Sheet id="dark-mode-by-default" sx={{ px: 3, py: 1.5, borderRadius: 'sm' }}>
        <Typography
          endDecorator={
            <Chip variant="outlined" color="primary" size="sm">
              Default
            </Chip>
          }
          fontSize="lg"
        >
          Dark mode
        </Typography>
      </Sheet>
    </CssVarsProvider>
  );
}
