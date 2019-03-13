import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import { exactProp } from '@material-ui/utils';
import createGenerateClassName from '../createGenerateClassName';
import { create } from 'jss';
import jssPreset from '../jssPreset';

// Default JSS instance.
const jss = create(jssPreset());

// Use a singleton or the provided one by the context.
//
// The counter-based approach doesn't tolerate any mistake.
// It's much safer to use the same counter everywhere.
const generateClassName = createGenerateClassName();

// Exported for test purposes
export const sheetsManager = new Map();

const defaultOptions = {
  disableGeneration: false,
  generateClassName,
  jss,
  sheetsCache: typeof window === 'undefined' ? new Map() : null,
  sheetsManager,
  sheetsRegistry: null,
};

export const StylesContext = React.createContext(defaultOptions);

function StylesProvider(props) {
  const { children, ...localOptions } = props;

  warning(
    typeof window !== 'undefined' || localOptions.sheetsManager,
    [
      'Material-UI: you need to provide a sheetsManager to the <StyleProvider> ' +
        'when rendering on the server.',
    ].join('\n'),
  );

  const outerOptions = React.useContext(StylesContext);

  return (
    <StylesContext.Provider value={{ ...outerOptions, ...localOptions }}>
      {children}
    </StylesContext.Provider>
  );
}

StylesProvider.propTypes = {
  /**
   * You can wrap a node.
   */
  children: PropTypes.node.isRequired,
  /**
   * You can disable the generation of the styles with this option.
   * It can be useful when traversing the React tree outside of the HTML
   * rendering step on the server.
   * Let's say you are using react-apollo to extract all
   * the queries made by the interface server-side.
   * You can significantly speed up the traversal with this property.
   */
  disableGeneration: PropTypes.bool,
  /**
   * JSS's class name generator.
   */
  generateClassName: PropTypes.func,
  /**
   * JSS's instance.
   */
  jss: PropTypes.object,
  /**
   * @ignore
   *
   * In beta.
   */
  sheetsCache: PropTypes.object,
  /**
   * The sheetsManager is used to deduplicate style sheet injection in the page.
   * It's deduplicating using the (theme, styles) couple.
   * On the server, you should provide a new instance for each request.
   */
  sheetsManager: PropTypes.object,
  sheetsRegistry: PropTypes.object,
};

if (process.env.NODE_ENV !== 'production') {
  StylesProvider.propTypes = exactProp(StylesProvider.propTypes);
}

StylesProvider.defaultProps = {
  disableGeneration: false,
};

export default StylesProvider;
