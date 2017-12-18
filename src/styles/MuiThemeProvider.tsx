import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as createBroadcast from 'brcast';
import * as warning from 'warning';
import themeListener, { CHANNEL } from './themeListener';
import exactProp from '../utils/exactProp';
import { Theme } from './createMuiTheme';

export interface MuiThemeProviderProps {
  children: React.ReactNode;
  disableStylesGeneration: boolean;
  sheetsManager?: object;
  theme: Theme | ((outer: Theme | null) => Theme);
}

/**
 * This component takes a `theme` property.
 * It makes the `theme` available down the React tree thanks to React context.
 * This component should preferably be used at **the root of your component tree**.
 */
const MuiThemeProvider: React.ComponentClass<
  MuiThemeProviderProps
> = class MuiThemeProvider extends React.Component<MuiThemeProviderProps> {
  constructor(props: MuiThemeProviderProps, context: any) {
    super(props, context);

    // Get the outer theme from the context, can be null
    this.outerTheme = themeListener.initial(context);
    // Propagate the theme so it can be accessed by the children
    this.broadcast.setState(this.mergeOuterLocalTheme(this.props.theme));
  }

  getChildContext() {
    return {
      [CHANNEL]: this.broadcast,
      muiThemeProviderOptions: {
        sheetsManager: this.props.sheetsManager,
        disableStylesGeneration: this.props.disableStylesGeneration,
      },
    };
  }

  componentDidMount() {
    // Subscribe on the outer theme, if present
    this.unsubscribeId = themeListener.subscribe(this.context, (outerTheme: object) => {
      this.outerTheme = outerTheme;
      // Forward the parent theme update to the children
      this.broadcast.setState(this.mergeOuterLocalTheme(this.props.theme));
    });
  }

  componentWillReceiveProps(nextProps: MuiThemeProviderProps) {
    // Propagate a local theme update
    if (this.props.theme !== nextProps.theme) {
      this.broadcast.setState(this.mergeOuterLocalTheme(nextProps.theme));
    }
  }

  componentWillUnmount() {
    if (this.unsubscribeId !== null) {
      themeListener.unsubscribe(this.context, this.unsubscribeId);
    }
  }

  broadcast = createBroadcast();
  unsubscribeId: number = null;
  // We are not using the React state in order to avoid unnecessary rerender.
  outerTheme: object = null;

  // Simple merge between the outer theme and the local theme
  mergeOuterLocalTheme(localTheme: object) {
    // To support composition of theme.
    if (typeof localTheme === 'function') {
      warning(
        this.outerTheme,
        [
          'Material-UI: you are providing a theme function property ' +
            'to the MuiThemeProvider component:',
          '<MuiThemeProvider theme={outerTheme => outerTheme} />',
          '',
          'However, no outer theme is present.',
          'Make sure a theme is already injected higher in the React tree ' +
            'or provide a theme object.',
        ].join('\n'),
      );
      return localTheme(this.outerTheme);
    }

    if (!this.outerTheme) {
      return localTheme;
    }

    return { ...this.outerTheme, ...localTheme };
  }

  render() {
    return this.props.children;
  }
};

MuiThemeProvider.propTypes = {
  /**
   * You can only provide a single element with react@15, a node with react@16.
   */
  children: PropTypes.node.isRequired,
  /**
   * You can disable the generation of the styles with this option.
   * It can be useful when traversing the React tree outside of the HTML
   * rendering step on the server.
   * Let's say you are using react-apollo to extract all
   * the queries made by the interface server side.
   * You can significantly speed up the traversal with this property.
   */
  disableStylesGeneration: PropTypes.bool,
  /**
   * The sheetsManager is used to deduplicate style sheet injection in the page.
   * It's deduplicating using the (theme, styles) couple.
   * On the server, you should provide a new instance for each request.
   */
  sheetsManager: PropTypes.object,
  /**
   * A theme object.
   */
  theme: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

MuiThemeProvider.defaultProps = {
  disableStylesGeneration: false,
  sheetsManager: null,
};

MuiThemeProvider.childContextTypes = {
  ...themeListener.contextTypes,
  muiThemeProviderOptions: PropTypes.object,
};

MuiThemeProvider.contextTypes = themeListener.contextTypes;

// Add a wrapper component to generate some helper messages in the development
// environment.
// eslint-disable-next-line import/no-mutable-exports
let MuiThemeProviderWrapper: any = MuiThemeProvider;

if (process.env.NODE_ENV !== 'production') {
  MuiThemeProviderWrapper = (props: MuiThemeProviderProps) => <MuiThemeProvider {...props} />;
  MuiThemeProviderWrapper.propTypes = exactProp(MuiThemeProvider.propTypes, 'MuiThemeProvider');
}

export default MuiThemeProviderWrapper;
