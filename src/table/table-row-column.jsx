import React from 'react';
import StylePropable from '../mixins/style-propable';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

const TableRowColumn = React.createClass({

  mixins: [
    StylePropable,
  ],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,
    columnNumber: React.PropTypes.number,
    hoverable: React.PropTypes.bool,
    key: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onHover: React.PropTypes.func,
    onHoverExit: React.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      hoverable: false,
    };
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
      hovered: false,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getTheme() {
    return this.state.muiTheme.tableRowColumn;
  },

  getStyles() {
    let theme = this.getTheme();
    let styles = {
      root: {
        paddingLeft: theme.spacing,
        paddingRight: theme.spacing,
        height: theme.height,
        textAlign: 'left',
        fontSize: 13,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
    };

    if (React.Children.count(this.props.children) === 1 && !isNaN(this.props.children)) {
      styles.textAlign = 'right';
    }

    return styles;
  },

  render() {
    let {
      className,
      columnNumber,
      hoverable,
      onClick,
      onHover,
      onHoverExit,
      style,
      ...other,
    } = this.props;
    let styles = this.getStyles();
    let handlers = {
      onClick: this._onClick,
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave,
    };

    return (
      <td
        key={this.props.key}
        className={className}
        style={this.prepareStyles(styles.root, style)}
        {...handlers}
        {...other}>
        {this.props.children}
      </td>
    );
  },

  _onClick(e) {
    if (this.props.onClick) this.props.onClick(e, this.props.columnNumber);
  },

  _onMouseEnter(e) {
    if (this.props.hoverable) {
      this.setState({hovered: true});
      if (this.props.onHover) this.props.onHover(e, this.props.columnNumber);
    }
  },

  _onMouseLeave(e) {
    if (this.props.hoverable) {
      this.setState({hovered: false});
      if (this.props.onHoverExit) this.props.onHoverExit(e, this.props.columnNumber);
    }
  },

});

export default TableRowColumn;
