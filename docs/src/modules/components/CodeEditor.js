import * as React from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-simple-code-editor';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import { styled } from '@mui/material/styles';
import prism from '@mui/markdown/prism';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import CodeCopyButton from 'docs/src/modules/components/CodeCopyButton';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import { useCodeCopy } from 'docs/src/modules/utils/CodeCopy';

const Wrapper = styled(MarkdownElement)(({ theme }) => ({
  position: 'relative',
  padding: 0,
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(0),
  },
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    outline: `3px solid ${
      theme.palette.mode === 'dark' ? theme.palette.primaryDark['500'] : theme.palette.primary.light
    }`,
    '& .MuiCode-copy': {
      opacity: 1,
    },
  },
  '&:focus-within': {
    outline: `3px solid ${
      theme.palette.mode === 'dark' ? theme.palette.primaryDark.main : theme.palette.primary.main
    }`,
  },
  '& pre': {
    maxHeight: 'initial',
  },
  '& > .MuiCode-root > pre': {
    margin: '0 auto',
    padding: 0,
    maxHeight: 'min(68vh, 1000px)',
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

const CodeEditor = ({ language = 'jsx', value, onChange, copyButtonProps, children, ...rest }) => {
  const t = useTranslate();
  const wrapperRef = React.useRef(null);
  const handlers = useCodeCopy();

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
          wrapperRef.current.lastElementChild.focus();
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
      <div className="MuiCode-root" {...handlers}>
        <pre>
          <StyledEditor
            padding={20}
            highlight={(code) => prism(code, language)}
            {...rest}
            value={value}
            onValueChange={onChange}
          />
        </pre>
        <Box
          aria-live="polite"
          tabIndex={0}
          sx={{
            color: 'white',
            position: 'absolute',
            top: '4px',
            right: '20px',
            fontSize: '12px',
            outline: 'none',
            '&:not(:focus)': visuallyHidden,
          }}
          dangerouslySetInnerHTML={{
            __html: t('editorHint'),
          }}
        />
        <CodeCopyButton
          {...copyButtonProps}
          code={value}
          onKeyDown={(event) => event.stopPropagation()}
        />
        {children}
      </div>
    </Wrapper>
  );
};

CodeEditor.propTypes = {
  children: PropTypes.node,
  copyButtonProps: PropTypes.object,
  language: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default CodeEditor;
