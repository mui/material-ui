import React from 'react';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props, state) {
  const {card} = state.muiTheme;

  return {
    root: {
      padding: 16,
      position: 'relative',
    },
    title: {
      fontSize: 24,
      color: props.titleColor || card.titleColor,
      display: 'block',
      lineHeight: '36px',
    },
    subtitle: {
      fontSize: 14,
      color: props.subtitleColor || card.subtitleColor,
      display: 'block',
    },
  };
}

const CardTitle = React.createClass({

  propTypes: {
    actAsExpander: React.PropTypes.bool,
    children: React.PropTypes.node,
    expandable: React.PropTypes.bool,
    showExpandableButton: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    subtitle: React.PropTypes.node,
    subtitleColor: React.PropTypes.string,
    subtitleStyle: React.PropTypes.object,
    title: React.PropTypes.node,
    titleColor: React.PropTypes.string,
    titleStyle: React.PropTypes.object,
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
    const rootStyle = Object.assign({}, styles.root, this.props.style);
    const titleStyle = Object.assign({}, styles.title, this.props.titleStyle);
    const subtitleStyle = Object.assign({}, styles.subtitle, this.props.subtitleStyle);

    return (
      <div {...this.props} style={prepareStyles(rootStyle)}>
        <span style={prepareStyles(titleStyle)}>
          {this.props.title}
        </span>
        <span style={prepareStyles(subtitleStyle)}>
          {this.props.subtitle}
        </span>
        {this.props.children}
      </div>
    );
  },
});

export default CardTitle;
