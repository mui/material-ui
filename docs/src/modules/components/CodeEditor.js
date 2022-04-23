import * as React from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-simple-code-editor';
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
  '& > pre': {
    margin: '0 auto',
    maxHeight: 'min(48vh, 600px)',
    '&:focus-within': {
      borderColor:
        theme.palette.mode === 'dark'
          ? theme.palette.primaryDark[500]
          : theme.palette.primaryDark[800],
    },
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
  borderRadius: 5,
  color: '#fff',

  float: 'left',
  minWidth: '100%',
  caretColor: 'white',
  '& > textarea, & > pre': {
    outline: 'none',
    whiteSpace: 'pre !important',
    overflow: 'hidden',
    padding: '0 5px',
  },
  '& > pre': {
    maxWidth: 'unset',
    '& > br': {
      display: 'none',
    },
  },
}));

const CodeEditor = ({ language = 'jsx', onChange, ...rest }) => {
  return (
    <Wrapper>
      <pre>
        <StyledEditor
          highlight={(code) => prism(code, language)}
          {...rest}
          onValueChange={onChange}
        />
      </pre>
    </Wrapper>
  );
};

CodeEditor.propTypes = {
  language: PropTypes.string,
  onChange: PropTypes.func,
};

export default CodeEditor;
