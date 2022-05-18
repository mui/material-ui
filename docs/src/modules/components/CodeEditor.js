import * as React from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-simple-code-editor';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import { styled } from '@mui/material/styles';
import prism from '@mui/markdown/prism';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';

const Wrapper = styled(MarkdownElement)(({ theme }) => ({
  padding: 0,
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(0),
  },
  borderRadius: theme.shape.borderRadius,
  outlineOffset: '-1px',
  '&:hover': {
    outline: `2px solid ${
      theme.palette.mode === 'dark' ? theme.palette.primaryDark['500'] : theme.palette.primary.light
    }`,
  },
  '&:focus-within': {
    outline: `2px solid ${
      theme.palette.mode === 'dark' ? theme.palette.primaryDark.main : theme.palette.primary.main
    }`,
  },
  '& > pre': {
    margin: '0 auto',
    padding: 0,
    maxHeight: 'min(48vh, 600px)',
  },
}));

const StyledEditor = styled(Editor)(({ theme }) => ({
  direction: 'ltr',
  display: 'inline-block',
  ...theme.typography.body2,
  fontSize: theme.typography.pxToRem(13),
  fontFamily: theme.typography.fontFamilyCode,
  fontWeight: 400,
  WebkitFontSmoothing: 'subpixel-antialiased',
  color: '#fff',

  float: 'left',
  minWidth: '100%',
  caretColor: 'white',
  '& > textarea, & > pre': {
    outline: 'none',
    whiteSpace: 'pre !important',
    overflow: 'hidden',
  },
  '& > pre': {
    maxWidth: 'unset',
    '& > br': {
      display: 'none',
    },
  },
}));

const CodeEditor = ({ language = 'jsx', onChange, ...rest }) => {
  const wrapperRef = React.useRef(null);

  React.useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.querySelector('textarea').tabIndex = -1;
    }
  }, []);
  return (
    <Wrapper
      ref={wrapperRef}
      onKeyDown={(event) => {
        if (event.key === 'Tab') {
          return;
        }

        if (event.key === 'Escape') {
          wrapperRef.current.querySelector('input').focus();
          return;
        }

        if (event.key === 'Enter') {
          const textArea = wrapperRef.current.querySelector('textarea');
          if (textArea && textArea !== document.activeElement) {
            event.preventDefault();
            event.stopPropagation();
            textArea.focus();
          }
        }
      }}
    >
      <pre>
        <StyledEditor
          padding={20}
          highlight={(code) => prism(code, language)}
          {...rest}
          onValueChange={onChange}
        />
      </pre>
      <Box as="input" sx={visuallyHidden} />
    </Wrapper>
  );
};

CodeEditor.propTypes = {
  language: PropTypes.string,
  onChange: PropTypes.func,
};

export default CodeEditor;
