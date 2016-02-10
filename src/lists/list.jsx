import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from '../utils/prop-types';
import Paper from '../paper';
import getMuiTheme from '../styles/getMuiTheme';
import Subheader from '../Subheader';
import deprecated from '../utils/deprecatedPropType';

const List = React.createClass({

  propTypes: {
    /**
     * These are usually ListItems that are passed to
     * be part of the list.
     */
    children: React.PropTypes.node,

    /**
     * If true, the subheader will be indented by 72px.
     */
    insetSubheader: deprecated(React.PropTypes.bool,
      'Refer to the `subheader` property.'),

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The subheader string that will be displayed at the top of the list.
     */
    subheader: deprecated(React.PropTypes.node,
      'Instead, nest the `Subheader` component directly inside the `List`.'),

    /**
     * The style object to override subheader styles.
     */
    subheaderStyle: deprecated(React.PropTypes.object,
      'Refer to the `subheader` property.'),

    /**
     * The zDepth prop passed to the Paper element inside list.
     */
    zDepth: PropTypes.zDepth,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    PureRenderMixin,
  ],

  getDefaultProps() {
    return {
      zDepth: 0,
    };
  },

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
      <Paper
        {...other}
        style={Object.assign(styles.root, style)}
        zDepth={zDepth}
      >
        {subheader && <Subheader inset={insetSubheader} style={subheaderStyle}>{subheader}</Subheader>}
        {children}
      </Paper>
    );
  },
});

export default List;
