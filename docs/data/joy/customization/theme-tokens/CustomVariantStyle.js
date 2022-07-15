import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

const theme = extendTheme({
  variants: {
    solid: {
      primary: {
        boxShadow: '0 2px 6px 0 rgba(0,0,0,0.3)',
      },
    },
    solidHover: {
      primary: {
        '&:hover': {
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.4)',
        },
      },
    },
  },
});

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default function BootstrapVariantTokens() {
  // the `node` is used for attaching CSS variables to this demo, you might not need it in your application.
  const [node, setNode] = React.useState(null);
  useEnhancedEffect(() => {
    setNode(document.getElementById('custom-variant-style-demo'));
  }, []);

  return (
    <CssVarsProvider
      theme={theme}
      colorSchemeNode={node || null}
      colorSchemeSelector="#custom-variant-style-demo"
    >
      <Box
        id="custom-variant-style-demo"
        sx={{
          display: 'flex',
          gap: 4,
          flexWrap: 'wrap',
          '& > div': { textAlign: 'center' },
        }}
      >
        <Box>
          <Button>Button</Button>
          <Typography level="body3" my={1}>
            The shadow applied
          </Typography>
        </Box>
        <Box>
          <Button color="danger">Button</Button>
          <Typography level="body3" my={1}>
            No custom shadow
          </Typography>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
