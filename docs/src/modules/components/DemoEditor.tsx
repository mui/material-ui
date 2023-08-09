import * as React from 'react';
import SimpleCodeEditor from 'react-simple-code-editor';
import Box from '@mui/material/Box';
import { NoSsr } from '@mui/base/NoSsr';
import { styled, useTheme } from '@mui/material/styles';
import prism from '@mui/markdown/prism';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import CodeCopyButton from 'docs/src/modules/components/CodeCopyButton';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import { useCodeCopy } from 'docs/src/modules/utils/CodeCopy';
import { blueDark } from 'docs/src/modules/brandingTheme';

const StyledMarkdownElement = styled(MarkdownElement)(({ theme }) => [
  {
    '& .scrollContainer': {
      maxHeight: 'min(68vh, 1000px)',
      overflow: 'auto',
      marginTop: -1,
      backgroundColor: '#0F1924', // a special, one-off, color tailored for the code blocks using MUI's branding theme blue palette as the starting point. It has a less saturaded color but still maintaining a bit of the blue tint.
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      colorScheme: 'dark',
      '&:hover': {
        boxShadow: `0 0 0 3px ${(theme.vars || theme).palette.primary.light}`,
      },
      '&:focus-within': {
        boxShadow: `0 0 0 2px ${(theme.vars || theme).palette.primary.main}`,
      },
      [theme.breakpoints.up('sm')]: {
        borderRadius: '0 0 12px 12px',
      },
    },
    '& pre': {
      // The scroll container needs to be the parent of the editor, overriding:
      // https://github.com/mui/material-ui/blob/269c1d0c7572fcb6ae3b270a2622d16c7e40c848/docs/src/modules/components/MarkdownElement.js#L27-L26
      maxWidth: 'initial',
      maxHeight: 'initial',
    },
  },
  theme.applyDarkStyles({
    '& .scrollContainer': {
      borderColor: (theme.vars || theme).palette.divider,
      '&:hover': {
        boxShadow: `0 0 0 3px ${(theme.vars || theme).palette.primaryDark[300]}`,
      },
      '&:focus-within': {
        boxShadow: `0 0 0 2px ${(theme.vars || theme).palette.primaryDark[400]}`,
      },
    },
  }),
]) as any;

const StyledSimpleCodeEditor = styled(SimpleCodeEditor)(({ theme }) => ({
  ...theme.typography.body2,
  fontSize: theme.typography.pxToRem(13),
  fontFamily: theme.typography.fontFamilyCode,
  fontWeight: 400,
  WebkitFontSmoothing: 'subpixel-antialiased',
  color: '#f8f8f2',
  direction: 'ltr /*! @noflip */' as any,
  float: 'left',
  minWidth: '100%',
  '& textarea': {
    outline: 0,
  },
  '& > textarea, & > pre': {
    // Override inline-style
    whiteSpace: 'pre !important',
  },
}));

interface DemoEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  copyButtonProps: {};
  id: string;
  language: string;
  onChange: () => {};
  value: string;
}

export default function DemoEditor(props: DemoEditorProps) {
  const { language, value, onChange, copyButtonProps, children, id, ...other } = props;
  const t = useTranslate();
  const contextTheme = useTheme();
  const wrapperRef = React.useRef<HTMLElement | null>(null);
  const enterRef = React.useRef<HTMLElement | null>(null);
  const handlers = useCodeCopy();

  React.useEffect(() => {
    wrapperRef.current!.querySelector('textarea')!.tabIndex = -1;
  }, []);

  return (
    <StyledMarkdownElement
      ref={wrapperRef}
      onKeyDown={(event: React.KeyboardEvent) => {
        if (event.key === 'Tab') {
          return;
        }

        if (event.key === 'Escape') {
          enterRef.current!.focus();
          return;
        }

        if (event.key === 'Enter') {
          const textarea = wrapperRef.current!.querySelector('textarea');
          if (textarea !== document.activeElement) {
            event.preventDefault();
            event.stopPropagation();
            textarea!.focus();
          }
        }
      }}
      {...other}
    >
      <div className="MuiCode-root" {...handlers}>
        <div className="scrollContainer">
          <StyledSimpleCodeEditor
            padding={contextTheme.spacing(2)}
            highlight={(code: any) =>
              `<code class="language-${language}">${prism(code, language)}</code>`
            }
            id={id}
            value={value}
            onValueChange={onChange}
          />
        </div>
        <Box
          ref={enterRef}
          aria-live="polite"
          tabIndex={0}
          sx={(theme) => ({
            position: 'absolute',
            top: theme.spacing(1),
            padding: theme.spacing(0.2, 1, 0.5, 1),
            outline: 0,
            left: '50%',
            border: '1px solid',
            borderColor: blueDark[600],
            backgroundColor: blueDark[700],
            color: '#FFF',
            transform: 'translateX(-50%)',
            borderRadius: '6px',
            fontSize: theme.typography.pxToRem(13),
            transition: 'all 0.3s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
            '&:not(:focus)': {
              top: 0,
              opacity: 0,
              pointerEvents: 'none',
            },
            '> kbd': {
              padding: theme.spacing(0.2, 0.4),
              backgroundColor: blueDark[500],
              fontSize: theme.typography.pxToRem(11),
              borderRadius: '6px',
              border: '1px solid',
              borderColor: blueDark[400],
            },
          })}
          dangerouslySetInnerHTML={{
            __html: t('editorHint'),
          }}
        />
        <NoSsr>
          <CodeCopyButton {...copyButtonProps} code={value} />
        </NoSsr>
        {children}
      </div>
    </StyledMarkdownElement>
  );
}
