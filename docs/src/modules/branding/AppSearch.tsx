import * as React from 'react';
import clsx from 'clsx';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import SearchIcon from 'docs/src/modules/branding/icons/Search';
import t1 from 'docs/src/modules/branding/t1';

const useStyles = makeStyles(
  (theme) => ({
    '@global': {
      '.algolia-autocomplete': {
        '& .ds-dropdown-menu': {
          boxShadow: theme.shadows[1],
          borderRadius: theme.shape.borderRadius,
          '&::before': {
            display: 'none',
          },
          '& [class^=ds-dataset-]': {
            border: 0,
            maxHeight: 'calc(100vh - 100px)',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.background.paper,
          },
        },
        '& .algolia-docsearch-suggestion--category-header-lvl0': {
          color: theme.palette.text.primary,
        },
        '& .algolia-docsearch-suggestion .algolia-docsearch-suggestion--subcategory-column': {
          opacity: 1,
          padding: '5.33px 10.66px',
          textAlign: 'right',
          width: '25%',
        },
        '& .algolia-docsearch-suggestion .algolia-docsearch-suggestion--content': {
          float: 'right',
          padding: '5.33px 0 5.33px 10.66px',
          width: '75%',
        },
        '& .algolia-docsearch-suggestion--subcategory-column-text': {
          color: theme.palette.text.secondary,
          fontWeight: theme.typography.fontWeightRegular,
        },
        '& .algolia-docsearch-suggestion--highlight': {
          color: theme.palette.mode === 'light' ? '#174d8c' : '#acccf1',
        },
        '& .algolia-docsearch-suggestion': {
          textDecoration: 'none',
          backgroundColor: theme.palette.background.paper,
        },
        '& .algolia-docsearch-suggestion--title': {
          ...theme.typography.h6,
          color: theme.palette.text.primary,
        },
        '& .algolia-docsearch-suggestion--text': {
          ...theme.typography.body2,
          color: theme.palette.text.secondary,
        },
        '&& .algolia-docsearch-suggestion--no-results': {
          width: '100%',
          '&::before': {
            display: 'none',
          },
        },
        '& .ds-dropdown-menu .ds-suggestion.ds-cursor .algolia-docsearch-suggestion--content': {
          backgroundColor: `${theme.palette.action.selected} !important`,
        },
      },
    },
    root: {
      fontFamily: theme.typography.fontFamily,
      position: 'relative',
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.grey5A,
      backgroundColor: theme.palette.greyF3,
      '& $inputInput': {
        transition: theme.transitions.create('width'),
        width: 140,
        '&:focus': {
          width: 170,
        },
      },
    },
    search: {
      width: theme.spacing(9),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 9),
    },
    shortcut: {
      fontSize: theme.typography.pxToRem(13),
      lineHeight: '21px',
      // color: alpha(theme.palette.common.white, 0.8),
      color: '#8796A5',
      border: `1px solid #8796A5`,
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
  }),
  { name: 'AppSearch' },
);

let macOS = false;

/**
 * When using this component it is recommend to include a preload link
 * `<link rel="preload" href="https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.css" as="style" />`
 * to potentially reduce load times
 */
export default function AppSearch() {
  const classes = useStyles();
  const inputRef = React.useRef(null);
  const [focused, setFocused] = React.useState(false);

  if (typeof window !== 'undefined') {
    macOS = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  }

  return (
    <div className={classes.root} style={{ display: 'flex' }}>
      <div className={classes.search}>
        <SearchIcon />
      </div>
      <Input
        disableUnderline
        placeholder={t1('Search docs')}
        inputProps={{
          'aria-label': t1('Search docs'),
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
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
      <div className={clsx(classes.shortcut, { 'Mui-focused': focused })}>
        {macOS ? '⌘' : 'Ctrl+'}K
      </div>
    </div>
  );
}
