import React from 'react';
import StylePropable from '../mixins/style-propable';
import getMuiTheme from '../styles/getMuiTheme';

const CardActions = React.createClass({

  propTypes: {
    actAsExpander: React.PropTypes.bool,
    children: React.PropTypes.node,
    expandable: React.PropTypes.bool,
    showExpandableButton: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
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

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getStyles() {
    return {
      root: {
        padding: 8,
        position: 'relative',
      },
    };
  },

  render() {
    let styles = this.getStyles();

    let children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        style: this.mergeStyles({marginRight: 8}, child.props.style),
      });
    });

    return (
      <div {...this.props} style={this.prepareStyles(styles.root, this.props.style)}>
        {children}
      </div>
    );
  },
});

export default CardActions;
