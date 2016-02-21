import React from 'react';
import Avatar from '../avatar';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props, state) {
  const {card} = state.muiTheme;

  return {
    root: {
      height: 72,
      padding: 16,
      fontWeight: card.fontWeight,
      boxSizing: 'border-box',
      position: 'relative',
    },
    text: {
      display: 'inline-block',
      verticalAlign: 'top',
    },
    avatar: {
      marginRight: 16,
    },
    title: {
      color: props.titleColor || card.titleColor,
      display: 'block',
      fontSize: 15,
    },
    subtitle: {
      color: props.subtitleColor || card.subtitleColor,
      display: 'block',
      fontSize: 14,
    },
  };
}

const CardHeader = React.createClass({

  propTypes: {
    actAsExpander: React.PropTypes.bool,
    avatar: React.PropTypes.node,
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
    textStyle: React.PropTypes.object,
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

  getDefaultProps() {
    return {
      avatar: null,
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
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);
    const rootStyle = Object.assign(styles.root, this.props.style);
    const textStyle = Object.assign(styles.text, this.props.textStyle);
    const titleStyle = Object.assign(styles.title, this.props.titleStyle);
    const subtitleStyle = Object.assign(styles.subtitle, this.props.subtitleStyle);

    let avatar = this.props.avatar;
    if (React.isValidElement(this.props.avatar)) {
      avatar = React.cloneElement(avatar, {
        style: Object.assign(styles.avatar, avatar.props.style),
      });
    } else if (avatar !== null) {
      avatar = <Avatar src={this.props.avatar} style={styles.avatar} />;
    }

    return (
      <div {...this.props} style={prepareStyles(rootStyle)}>
        {avatar}
        <div style={prepareStyles(textStyle)}>
          <span style={prepareStyles(titleStyle)}>{this.props.title}</span>
          <span style={prepareStyles(subtitleStyle)}>{this.props.subtitle}</span>
        </div>
        {this.props.children}
      </div>
    );
  },
});

export default CardHeader;
