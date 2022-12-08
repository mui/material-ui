import * as React from 'react';
import Button from '@mui/material/Button';
import { colorChannel } from '@mui/system';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  styled,
} from '@mui/material/styles';

// Custom button using custom styles with CSS variables
const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.vars.palette.success.dark,
  color: theme.vars.palette.common.white,
  '&:hover': {
    backgroundColor: `rgba(${theme.vars.palette.success.mainChannel} / 0.95)`,
  },
}));

// Custom button using CSS variables
const CssVarsCustomButton = styled(Button)({
  '--mui-palette-primary-main': '#FF0000',
  '--mui-palette-primary-dark': '#8B0000',
  '--mui-palette-primary-mainChannel': colorChannel('#FF0000'), // necessary for calculating the alpha values
});

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default function App() {
  // the `node` is used for attaching CSS variables to this demo, you might not need it in your application.
  const [node, setNode] = React.useState(null);
  useEnhancedEffect(() => {
    setNode(document.getElementById('css-vars-customization'));
  }, []);
  return (
    <div id="css-vars-customization">
      <CssVarsProvider
        colorSchemeNode={node || null}
        colorSchemeSelector="#css-vars-customization"
      >
        <CustomButton sx={{ mr: 1 }}>Custom styles</CustomButton>
        <CssVarsCustomButton variant="contained">CSS variables</CssVarsCustomButton>
      </CssVarsProvider>
    </div>
  );
}
