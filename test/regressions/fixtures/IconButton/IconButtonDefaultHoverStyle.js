import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const theme = createTheme({});

const HOVER_MOCK_CLASS = 'hoverMock';

function copyHoverStyles() {
  const styleSheet = document.styleSheets[0];
  const hoverRule = Array.from(styleSheet.cssRules)
    .filter((rule) => rule instanceof CSSStyleRule)
    .find((rule) => rule.selectorText.includes('MuiIconButton-root:hover'));

  if (!hoverRule) return;

  const newRule = `.${HOVER_MOCK_CLASS} { ${hoverRule.style.cssText} }`;
  styleSheet.insertRule(newRule, styleSheet.cssRules.length);
}

export default function IconButtons() {
  React.useLayoutEffect(() => {
    copyHoverStyles();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <IconButton aria-label="delete" className={HOVER_MOCK_CLASS}>
        <DeleteIcon />
      </IconButton>
    </ThemeProvider>
  );
}
