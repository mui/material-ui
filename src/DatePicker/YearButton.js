import React from 'react';
import EnhancedButton from '../internal/EnhancedButton';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props, state) {
  const {
    selected,
    year,
  } = props;

  const {
    hover,
  } = state;

  const {
    baseTheme,
    datePicker,
  } = state.muiTheme;

  return {
    root: {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      position: 'relative',
      display: 'block',
      margin: '0 auto',
      width: 36,
      fontSize: 14,
      padding: '8px 2px',
      color: year === new Date().getFullYear() && datePicker.color,
    },
    label: {
      position: 'relative',
      top: -1,
      color: hover || selected ? datePicker.selectTextColor : baseTheme.palette.textColor,
    },
    buttonState: {
      position: 'absolute',
      height: 32,
      width: 32,
      opacity: hover ? 0.6 : selected ? 1 : 0,
      borderRadius: '50%',
      transform: hover || selected ? 'scale(1.5)' : 'scale(0)',
      backgroundColor: datePicker.selectColor,
    },
  };
}

const YearButton = React.createClass({

  propTypes: {
    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,
    onTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool,
    year: React.PropTypes.number,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      selected: false,
    };
  },

  getInitialState() {
    return {
      hover: false,
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

  _handleMouseEnter() {
    this.setState({hover: true});
  },

  _handleMouseLeave() {
    this.setState({hover: false});
  },

  _handleTouchTap(event) {
    if (this.props.onTouchTap) this.props.onTouchTap(event, this.props.year);
  },

  render() {
    const {
      className,
      year,
      onTouchTap,
      selected,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    return (
      <EnhancedButton
        {...other}
        style={styles.root}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        onTouchTap={this._handleTouchTap}
      >
        <div style={prepareStyles(styles.buttonState)} />
        <span style={prepareStyles(styles.label)}>{year}</span>
      </EnhancedButton>
    );
  },

});

export default YearButton;
