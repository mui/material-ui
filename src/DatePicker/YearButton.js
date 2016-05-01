import React, {Component, PropTypes} from 'react';
import EnhancedButton from '../internal/EnhancedButton';

function getStyles(props, context) {
  const {
    selected,
    year,
  } = props;

  const {hover} = context;

  const {
    baseTheme,
    datePicker,
  } = context.muiTheme;

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
      lineHeight: 'inherit',
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

class YearButton extends Component {
  static propTypes = {
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    onTouchTap: PropTypes.func,
    selected: PropTypes.bool,
    year: PropTypes.number,
  };

  static defaultProps = {
    selected: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    hover: false,
  };

  handleMouseEnter = () => {
    this.setState({hover: true});
  };

  handleMouseLeave = () => {
    this.setState({hover: false});
  };

  handleTouchTap = (event) => {
    if (this.props.onTouchTap) this.props.onTouchTap(event, this.props.year);
  };

  render() {
    const {
      className, // eslint-disable-line no-unused-vars
      year,
      onTouchTap, // eslint-disable-line no-unused-vars
      selected, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    return (
      <EnhancedButton
        {...other}
        style={styles.root}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchTap={this.handleTouchTap}
      >
        <div style={prepareStyles(styles.buttonState)} />
        <span style={prepareStyles(styles.label)}>{year}</span>
      </EnhancedButton>
    );
  }
}

export default YearButton;
