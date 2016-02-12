import React from 'react';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles() {
  return {
    root: {
      padding: 8,
      position: 'relative',
    },
    action: {
      marginRight: 8,
    },
  };
}

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

  childContextTypes: {
    muiTheme: React.PropTypes.object,
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
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    const children = React.Children.map(this.props.children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          style: Object.assign({}, styles.action, child.props.style),
        });
      }
    });

    return (
      <div {...this.props} style={prepareStyles(Object.assign(styles.root, this.props.style))}>
        {children}
      </div>
    );
  },
});

export default CardActions;
