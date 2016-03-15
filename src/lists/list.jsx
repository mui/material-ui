import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MuiPropTypes from '../utils/mui-prop-types';
import getMuiTheme from '../styles/getMuiTheme';
import Subheader from '../Subheader';
import deprecated from '../utils/deprecatedPropType';
import warning from 'warning';

const List = React.createClass({

  propTypes: {
    /**
     * These are usually ListItems that are passed to
     * be part of the list.
     */
    children: PropTypes.node,

    /**
     * If true, the subheader will be indented by 72px.
     */
    insetSubheader: deprecated(PropTypes.bool,
      'Refer to the `subheader` property.'),

    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,

    /**
     * The subheader string that will be displayed at the top of the list.
     */
    subheader: deprecated(PropTypes.node,
      'Instead, nest the `Subheader` component directly inside the `List`.'),

    /**
     * The style object to override subheader styles.
     */
    subheaderStyle: deprecated(PropTypes.object,
      'Refer to the `subheader` property.'),

    /**
     * @ignore
     * ** Breaking change ** List no longer supports `zDepth`. Instead, wrap it in `Paper`
     * or another component that provides zDepth.
     */
    zDepth: MuiPropTypes.zDepth,
  },

  contextTypes: {
    muiTheme: PropTypes.object,
  },

  childContextTypes: {
    muiTheme: PropTypes.object,
  },

  mixins: [
    PureRenderMixin,
  ],

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  render() {
    const {
      children,
      insetSubheader = false,
      style,
      subheader,
      subheaderStyle,
      zDepth,
      ...other,
    } = this.props;

    warning((typeof zDepth === 'undefined'), 'List no longer supports `zDepth`. Instead, wrap it in `Paper` ' +
        'or another component that provides zDepth.');

    let hasSubheader = false;

    if (subheader) {
      hasSubheader = true;
    } else {
      const firstChild = React.Children.toArray(children)[0];
      if (React.isValidElement(firstChild) && firstChild.type === Subheader) {
        hasSubheader = true;
      }
    }

    const styles = {
      root: {
        padding: 0,
        paddingBottom: 8,
        paddingTop: hasSubheader ? 0 : 8,
      },
    };

    return (
      <div
        {...other}
        style={Object.assign(styles.root, style)}
      >
        {subheader && <Subheader inset={insetSubheader} style={subheaderStyle}>{subheader}</Subheader>}
        {children}
      </div>
    );
  },
});

export default List;
