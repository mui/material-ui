import React, {PropTypes} from 'react';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props, state) {
  const {
    cardText,
  } = state.muiTheme;

  return {
    root: {
      padding: 16,
      fontSize: 14,
      color: props.color || cardText.textColor,
    },
  };
}

const CardText = React.createClass({

  propTypes: {
    /**
     * If true, a click on this card component expands the card.
     */
    actAsExpander: PropTypes.bool,

    /**
     * Can be used to render elements inside the Card Text.
     */
    children: PropTypes.node,

    /**
     * Override the CardText color.
     */
    color: PropTypes.string,

    /**
     * If true, this card component is expandable.
     */
    expandable: PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  },

  contextTypes: {
    muiTheme: PropTypes.object,
  },

  childContextTypes: {
    muiTheme: PropTypes.object,
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
    const rootStyle = Object.assign(styles.root, this.props.style);

    return (
      <div {...this.props} style={prepareStyles(rootStyle)}>
        {this.props.children}
      </div>
    );
  },
});

export default CardText;
