import * as React from 'react';
// import url from 'url';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/styles';
import { alpha, useTheme } from '@material-ui/core/styles';
// import { handleEvent } from 'docs/src/modules/components/MarkdownLinks';
import { DocSearch } from '@docsearch/react';
import '@docsearch/react/dist/style.css';
// import { LANGUAGES_SSR } from 'docs/src/modules/constants';
// import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';

const useStyles = makeStyles(
  (theme) => ({
    '@global': {
      ':root': {
        '--docsearch-modal-height': 'calc(100vh - 100px)',
        '--docsearch-primary-color': theme.palette.primary.main,
        '--docsearch-text-color': theme.palette.text.primary,
        // '--docsearch-container-background': theme.palette.background.paper,
        '--docsearch-modal-background': theme.palette.background.paper,
        '--docsearch-searchbox-background': alpha(theme.palette.common.white, 0.15),
        '--docsearch-searchbox-focus-background': alpha(theme.palette.common.white, 0.5),
        '--docsearch-key-gradient': alpha(theme.palette.common.white, 0.4),
        '--docsearch-key-shadow': 'none',
        '--docsearch-hit-color': theme.palette.primary.main,
        '--docsearch-hit-shadow': theme.shadows[1],
        '--docsearch-hit-background': theme.palette.background.paper,
        '--docsearch-footer-background': theme.palette.background.paper,
        '--docsearch-footer-shadow': '0 -4px 8px 0 rgba(0, 0, 0, 0.2)',
        '--docsearch-logo-color': theme.palette.primary.main,
        '--docsearch-muted-color': 'rgb(127, 132, 151)',
        '.DocSearch-Form': {
          '--docsearch-searchbox-shadow': '0 0 0 2px rgba(0, 0, 0, 0.3)',
        },
        '.DocSearch-Button': {
          '--docsearch-searchbox-background': alpha(theme.palette.common.white, 0.15),
          '--docsearch-searchbox-focus-background': '#fff',
          '--docsearch-text-color': 'rgb(28, 30, 33)',
          '--docsearch-muted-color': 'rgb(117 124 138)',
          '--docsearch-searchbox-shadow': '0 0 0 2px rgba(0, 0, 0, 0.3)',
        },
      },
      '.DocSearch-Button': { margin: '0px', height: '39px' },
      '.DocSearch-Button-Placeholder': { width: '100%', textAlign: 'left' },
      '.DocSearch-Search-Icon': { width: '28px' },
      '.DocSearch-Container': {
        zIndex: theme.zIndex.appBar + 1,
        borderRadius: theme.shape.borderRadius,
        '& .DocSearch-Commands-Key': { paddingBottom: '1px' },
      },
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
  useStyles();
  const theme = useTheme();
  // const userLanguage = useUserLanguage();
  // const t = useTranslate();

  // React.useEffect(() => {
  //   const handleKeyDown = (nativeEvent) => {
  //     if (nativeEvent.defaultPrevented) {
  //       return;
  //     }

  //     if (nativeEvent.key === 'Escape' && document.activeElement === inputRef.current) {
  //       inputRef.current.blur();
  //       return;
  //     }

  //     const matchMainShortcut =
  //       (nativeEvent.ctrlKey || nativeEvent.metaKey) && nativeEvent.key === 'k';
  //     const matchNonkeyboardNode =
  //       ['INPUT', 'SELECT', 'TEXTAREA'].indexOf(document.activeElement.tagName) === -1 &&
  //       !document.activeElement.isContentEditable;

  //     if (matchMainShortcut && matchNonkeyboardNode) {
  //       nativeEvent.preventDefault();
  //       inputRef.current.focus();
  //     }
  //   };

  //   document.addEventListener('keydown', handleKeyDown);
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, []);

  const desktop = useMediaQuery(theme.breakpoints.up('sm'));

  // React.useEffect(() => {
  //   if (desktop) {
  // In non-SSR languages, fall back to English.
  // const facetFilterLanguage =
  //   LANGUAGES_SSR.indexOf(userLanguage) !== -1 ? `language:${userLanguage}` : `language:en`;
  // This assumes that by the time this effect runs the Input component is committed
  // this holds true as long as the effect and the component are in the same
  // suspense boundary. If you move effect and component apart be sure to check
  // that this assumption still holds
  // const search = docsearch({
  //   apiKey: '1d8534f83b9b0cfea8f16498d19fbcab',
  //   indexName: 'material-ui',
  //   inputSelector: '#docsearch-input',
  //   algoliaOptions: {
  //     facetFilters: ['version:next', facetFilterLanguage],
  //   },
  //   autocompleteOptions: {
  //     openOnFocus: true,
  //   },
  //   handleSelected: (input, event, suggestion) => {
  //     event.button = 0;
  //     const parseUrl = url.parse(suggestion.url);
  //     handleEvent(event, parseUrl.pathname + parseUrl.hash);
  //     input.close();
  //   },
  //   debug: true, // Set debug to true if you want to inspect the dropdown.
  // });
  // search.autocomplete.on('autocomplete:cursorchanged', (event) => {
  //   const combobox = event.target;
  //   const selectedOptionNode = document.getElementById(
  //     combobox.getAttribute('aria-activedescendant'),
  //   );
  //   const listboxNode = document.querySelector('.ds-suggestions').parentElement;
  //   if (selectedOptionNode === null || listboxNode === null) {
  //     if (process.env.NODE_ENV !== 'production') {
  //       console.warn('Cant scroll to selected option.');
  //     }
  //     return;
  //   }
  //   // Scroll active descendant into view.
  //   // Logic copied from https://www.w3.org/TR/wai-aria-practices/examples/listbox/js/listbox.js
  //   //
  //   // Consider this API instead once it has a better browser support:
  //   // .scrollIntoView({ scrollMode: 'if-needed', block: 'nearest' });
  //   if (listboxNode.scrollHeight > listboxNode.clientHeight) {
  //     const element = selectedOptionNode;
  //     const scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
  //     const elementBottom = element.offsetTop + element.offsetHeight;
  //     if (elementBottom > scrollBottom) {
  //       listboxNode.scrollTop = elementBottom - listboxNode.clientHeight;
  //     } else if (element.offsetTop < listboxNode.scrollTop) {
  //       listboxNode.scrollTop = element.offsetTop;
  //     }
  //   }
  // });
  //   }
  // }, [desktop, userLanguage]);

  // const macOS = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <div style={{ display: desktop ? 'flex' : 'none' }}>
      <DocSearch
        apiKey="1d8534f83b9b0cfea8f16498d19fbcab"
        indexName="material-ui"
        transformItems={(items) => {
          return items.map((item) => {
            const a = document.createElement('a');
            a.href = item.url;
            return {
              ...item,
              url: `${a.pathname}${a.hash}`,
            };
          });
        }}
      />
    </div>
  );
}
