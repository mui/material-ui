import * as React from 'react';
import PropTypes from 'prop-types';
import { Provider, Preview, Error } from 'jarle';
import Editor from 'react-simple-code-editor';
import prism from '@mui/markdown/prism';
import { Box, Typography } from '@mui/system';
import { styled } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import DemoErrorBoundary from 'docs/src/modules/components/DemoErrorBoundary';

export function EditableDemoPreview({ code, resolveDemoImports, language, demoKey }) {
  return (
    <Provider code={code} resolveImports={resolveDemoImports} language={language}>
      <Preview key={demoKey} />
      <Error />
    </Provider>
  );
}

const StyledEditor = styled(Editor)({
  fontFamily: 'Consolas, Menlo, Courier, monospace',
  fontSize: '0.8125rem',
  WebkitFontSmoothing: 'subpixel-antialiased',
  '& textarea': {
    '&:focus': {
      outline: 'none',
    },
  },
});

let lastInput = 'mousedown';
if (typeof window !== 'undefined') {
  window.document.addEventListener('mousedown', () => {
    lastInput = 'mousedown';
  });
  window.document.addEventListener('keydown', () => {
    lastInput = 'keyDown';
  });
}

export function EditableDemoEditor({ code, language, name, onChange, onFocus, onResetDemoClick }) {
  const t = useTranslate();
  const [ignoreTabKey, setIgnoreTabKey] = React.useState(true);
  const handleEditorKeyDown = (event) => {
    const { key } = event;
    if (ignoreTabKey && key !== 'Tab' && key !== 'Shift') {
      if (key === 'Enter') {
        event.preventDefault();
      }
      setIgnoreTabKey(false);
    }
    if (!ignoreTabKey && key === 'Escape') {
      setIgnoreTabKey(true);
    }
  };

  const [keyboardFocused, setKeyboardFocused] = React.useState(false);
  const handleEditorFocus = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    if (onFocus) {
      onFocus();
    }
    setIgnoreTabKey(true);
    setKeyboardFocused(lastInput !== 'mousedown');
  };

  const handleEditorBlur = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    setKeyboardFocused(false);
    setIgnoreTabKey(true);
  };

  return (
    <Box
      sx={{
        maxHeight: 'min(68vh, 1000px)',
        maxWidth: 'calc(100vw - 32px)',
        overflow: 'auto',
        padding: '16.5px 21px',
        marginBottom: '8px',
        borderRadius: '10px',
        border: '1px solid',
        borderColor: '#132F4C',
        backgroundColor: '#001E3C',
        color: 'white',
        caretColor: 'white',
        '&.Mui-focused': {
          outline: '2px solid #007FFF',
        },
      }}
      className={{
        'Mui-focused': keyboardFocused,
      }}
    >
      <DemoErrorBoundary name={name} onResetDemoClick={onResetDemoClick}>
        <StyledEditor
          value={code}
          highlight={(syntax) => prism(syntax, language.toLowerCase())}
          onFocus={handleEditorFocus}
          onBlur={handleEditorBlur}
          onKeyDown={handleEditorKeyDown}
          onValueChange={onChange}
          ignoreTabKey={ignoreTabKey}
        />
        {(keyboardFocused || !ignoreTabKey) ?? (
          <Typography sx={visuallyHidden} aria-live="polite">
            {ignoreTabKey ? t('demo.pressEnter') : t('demo.pressEscape')}
          </Typography>
        )}
      </DemoErrorBoundary>
    </Box>
  );
}

EditableDemoPreview.propTypes = {
  code: PropTypes.string.isRequired,
  demoKey: PropTypes.number,
  language: PropTypes.string.isRequired,
  resolveDemoImports: PropTypes.func,
};

EditableDemoEditor.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onResetDemoClick: PropTypes.func.isRequired,
};
