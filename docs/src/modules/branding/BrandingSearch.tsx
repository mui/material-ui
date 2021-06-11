import * as React from 'react';
import clsx from 'clsx';
import useLazyCSS from 'docs/src/modules/utils/useLazyCSS';
import { alpha, styled } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const Root = styled('div')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  position: 'relative',
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  '& $inputInput': {
    transition: theme.transitions.create('width'),
    width: 140,
    '&:focus': {
      width: 170,
    },
  },
  '& .BrandingSearch-icon': {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .MuiInputBase-root': {
    color: 'inherit',
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 9),
  },
  '& .BrandingSearch-shortcut': {
    fontSize: theme.typography.pxToRem(13),
    lineHeight: '21px',
    color: alpha(theme.palette.common.white, 0.8),
    border: `1px solid ${alpha(theme.palette.common.white, 0.4)}`,
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    padding: theme.spacing(0, 0.5),
    position: 'absolute',
    right: theme.spacing(1),
    height: 23,
    top: 'calc(50% - 11px)',
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
    }),
    // So that clicks target the input.
    // Makes the text non selectable but neither is the placeholder or adornment.
    pointerEvents: 'none',
    '&.Mui-focused': {
      opacity: 0,
    },
  },
}));

/**
 * When using this component it is recommend to include a preload link
 * `<link rel="preload" href="https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.css" as="style" />`
 * to potentially reduce load times
 */
export default function BrandingSearch() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [focused, setFocused] = React.useState(false);
  const t = useTranslate();

  useLazyCSS('https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.css', '#app-search');

  React.useEffect(() => {
    const handleKeyDown = (nativeEvent: KeyboardEvent) => {
      if (nativeEvent.defaultPrevented) {
        return;
      }

      if (nativeEvent.key === 'Escape' && document.activeElement === inputRef.current) {
        inputRef.current!.blur();
        return;
      }

      const matchMainShortcut =
        (nativeEvent.ctrlKey || nativeEvent.metaKey) && nativeEvent.key === 'k';
      const matchNonkeyboardNode =
        ['INPUT', 'SELECT', 'TEXTAREA'].indexOf(document.activeElement!.tagName) === -1 &&
        !(document.activeElement as any).isContentEditable;

      if (matchMainShortcut && matchNonkeyboardNode) {
        nativeEvent.preventDefault();
        inputRef.current!.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const macOS = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <Root>
      <div className="BrandingSearch-icon">
        <SearchIcon />
      </div>
      <InputBase
        placeholder={`${t('algoliaSearch')}…`}
        inputProps={{
          'aria-label': t('algoliaSearch'),
        }}
        type="search"
        id="docsearch-input"
        inputRef={inputRef}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
      />
      <div className={clsx('BrandingSearch-shortcut', { 'Mui-focused': focused })}>
        {macOS ? '⌘' : 'Ctrl+'}K
      </div>
    </Root>
  );
}
