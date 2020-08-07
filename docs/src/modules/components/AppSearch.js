import React from 'react';
import url from 'url';
import { useSelector } from 'react-redux';
import useLazyCSS from 'docs/src/modules/utils/useLazyCSS';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { fade, useTheme, makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import { handleEvent } from 'docs/src/modules/components/MarkdownLinks';
import docsearch from 'docsearch.js';

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
          color: theme.palette.type === 'light' ? '#174d8c' : '#acccf1',
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
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      '& $inputInput': {
        transition: theme.transitions.create('width'),
        width: 120,
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
  }),
  { name: 'AppSearch' },
);

/**
 * When using this component it is recommend to include a preload link
 * `<link rel="preload" href="https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.css" as="style" />`
 * to potentially reduce load times
 */
export default function AppSearch() {
  const classes = useStyles();
  const inputRef = React.useRef(null);
  const theme = useTheme();
  const userLanguage = useSelector((state) => state.options.userLanguage);
  const t = useSelector((state) => state.options.t);

  useLazyCSS('https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.css', '#app-search');

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      // Use event.keyCode to support IE 11
      if (
        [
          191, // '/'
          83, // 's'
        ].indexOf(event.keyCode) !== -1 &&
        document.activeElement.nodeName === 'BODY' &&
        document.activeElement !== inputRef.current
      ) {
        event.preventDefault();
        inputRef.current.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const desktop = useMediaQuery(theme.breakpoints.up('sm'));

  React.useEffect(() => {
    if (desktop) {
      // This assumes that by the time this effect runs the Input component is committed
      // this holds true as long as the effect and the component are in the same
      // suspense boundary. If you move effect and component apart be sure to check
      // that this assumption still holds
      const search = docsearch({
        apiKey: '1d8534f83b9b0cfea8f16498d19fbcab',
        indexName: 'material-ui',
        inputSelector: '#docsearch-input',
        algoliaOptions: {
          facetFilters: ['version:master', `language:${userLanguage}`],
        },
        autocompleteOptions: {
          openOnFocus: true,
        },
        handleSelected: (input, event, suggestion) => {
          event.button = 0;
          const parseUrl = url.parse(suggestion.url);
          handleEvent(event, parseUrl.pathname + parseUrl.hash);
          input.close();
        },
        // debug: true, // Set debug to true if you want to inspect the dropdown.
      });

      search.autocomplete.on('autocomplete:cursorchanged', (event) => {
        const combobox = event.target;
        const selectedOptionNode = document.getElementById(
          combobox.getAttribute('aria-activedescendant'),
        );
        const listboxNode = document.querySelector('.ds-suggestions').parentElement;

        if (selectedOptionNode === null || listboxNode === null) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn('Cant scroll to selected option.');
          }
          return;
        }

        // Scroll active descendant into view.
        // Logic copied from https://www.w3.org/TR/wai-aria-practices/examples/listbox/js/listbox.js
        //
        // Consider this API instead once it has a better browser support:
        // .scrollIntoView({ scrollMode: 'if-needed', block: 'nearest' });
        if (listboxNode.scrollHeight > listboxNode.clientHeight) {
          const element = selectedOptionNode;

          const scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
          const elementBottom = element.offsetTop + element.offsetHeight;
          if (elementBottom > scrollBottom) {
            listboxNode.scrollTop = elementBottom - listboxNode.clientHeight;
          } else if (element.offsetTop < listboxNode.scrollTop) {
            listboxNode.scrollTop = element.offsetTop;
          }
        }
      });
    }
  }, [desktop, userLanguage]);

  return (
    <div className={classes.root} style={{ display: desktop ? 'flex' : 'none' }}>
      <div className={classes.search}>
        <SearchIcon />
      </div>
      <Input
        disableUnderline
        placeholder={`${t('algoliaSearch')}…`}
        inputProps={{
          'aria-label': t('algoliaSearch'),
        }}
        type="search"
        id="docsearch-input"
        inputRef={inputRef}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
    </div>
  );
}
