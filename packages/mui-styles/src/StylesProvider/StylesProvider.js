import * as React from 'react';
import PropTypes from 'prop-types';
import { exactProp } from '@mui/utils';
import { create } from 'jss';
import createGenerateClassName from '../createGenerateClassName';
import jssPreset from '../jssPreset';

// Default JSS instance.
const defaultJSS = create(jssPreset());

// Use a singleton or the provided one by the context.
//
// The counter-based approach doesn't tolerate any mistake.
// It's much safer to use the same counter everywhere.
const defaultGenerateClassName = createGenerateClassName();

const defaultSheetsManager = new Map();
// Exported for test purposes
export { defaultSheetsManager as sheetsManager };

const defaultOptions = {
  disableGeneration: false,
  generateClassName: defaultGenerateClassName,
  jss: defaultJSS,
  sheetsCache: null,
  sheetsManager: defaultSheetsManager,
  sheetsRegistry: null,
};

export const StylesContext = React.createContext(defaultOptions);

if (process.env.NODE_ENV !== 'production') {
  StylesContext.displayName = 'StylesContext';
}

let injectFirstNode;

export default function StylesProvider(props) {
  const { children, injectFirst = false, disableGeneration = false, ...localOptions } = props;

  const outerOptions = React.useContext(StylesContext);
  const {
    generateClassName,
    jss,
    serverGenerateClassName,
    sheetsCache,
    sheetsManager,
    sheetsRegistry,
  } = { ...outerOptions, ...localOptions };

  if (process.env.NODE_ENV !== 'production') {
    if (injectFirst && localOptions.jss) {
      console.error('MUI: You cannot use the jss and injectFirst props at the same time.');
    }
  }

  const value = React.useMemo(() => {
    const context = {
      disableGeneration,
      generateClassName,
      jss,
      serverGenerateClassName,
      sheetsCache,
      sheetsManager,
      sheetsRegistry,
    };

    if (process.env.NODE_ENV !== 'production') {
      if (typeof window === 'undefined' && !context.sheetsManager) {
        console.error(
          'MUI: You need to use the ServerStyleSheets API when rendering on the server.',
        );
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      if (context.jss.options.insertionPoint && injectFirst) {
        console.error(
          'MUI: You cannot use a custom insertionPoint and <StylesContext injectFirst> at the same time.',
        );
      }
    }

    if (!context.jss.options.insertionPoint && injectFirst && typeof window !== 'undefined') {
      if (!injectFirstNode) {
        const head = document.head;
        // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- injectFirstNode is called inside callback
        injectFirstNode = document.createComment('mui-inject-first');
        head.insertBefore(injectFirstNode, head.firstChild);
      }

      context.jss = create({ plugins: jssPreset().plugins, insertionPoint: injectFirstNode });
    }

    return context;
  }, [
    injectFirst,
    disableGeneration,
    generateClassName,
    jss,
    serverGenerateClassName,
    sheetsCache,
    sheetsManager,
    sheetsRegistry,
  ]);

  return <StylesContext.Provider value={value}>{children}</StylesContext.Provider>;
}

StylesProvider.propTypes = {
  /**
   * Your component tree.
   */
  children: PropTypes.node,
  /**
   * You can disable the generation of the styles with this option.
   * It can be useful when traversing the React tree outside of the HTML
   * rendering step on the server.
   * Let's say you are using react-apollo to extract all
   * the queries made by the interface server-side - you can significantly speed up the traversal with this prop.
   */
  disableGeneration: PropTypes.bool,
  /**
   * JSS's class name generator.
   */
  generateClassName: PropTypes.func,
  /**
   * By default, the styles are injected last in the <head> element of the page.
   * As a result, they gain more specificity than any other style sheet.
   * If you want to override MUI's styles, set this prop.
   */
  injectFirst: PropTypes.bool,
  /**
   * JSS's instance.
   */
  jss: PropTypes.object,
  /**
   * @ignore
   */
  serverGenerateClassName: PropTypes.func,
  /**
   * @ignore
   *
   * Beta feature.
   *
   * Cache for the sheets.
   */
  sheetsCache: PropTypes.object,
  /**
   * @ignore
   *
   * The sheetsManager is used to deduplicate style sheet injection in the page.
   * It's deduplicating using the (theme, styles) couple.
   * On the server, you should provide a new instance for each request.
   */
  sheetsManager: PropTypes.object,
  /**
   * @ignore
   *
   * Collect the sheets.
   */
  sheetsRegistry: PropTypes.object,
};

if (process.env.NODE_ENV !== 'production') {
  StylesProvider.propTypes = exactProp(StylesProvider.propTypes);
}
