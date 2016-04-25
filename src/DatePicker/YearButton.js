import React, {Component, PropTypes} from 'react';
import EnhancedButton from '../internal/EnhancedButton';

function getStyles(props, context, state) {
  const {selected, year} = props;
  const {baseTheme, datePicker} = context.muiTheme;
  const {hover} = state;

  return {
    root: {
      boxSizing: 'border-box',
      color: year === new Date().getFullYear() && datePicker.color,
      display: 'block',
      fontSize: 14,
      margin: '0 auto',
      position: 'relative',
      textAlign: 'center',
      lineHeight: 'inherit',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
    },
    label: {
      alignSelf: 'center',
      color: hover || selected ? datePicker.color : baseTheme.palette.textColor,
      fontSize: selected ? 26 : 17,
      fontWeight: hover ? 450 : selected ? 500 : 400,
      position: 'relative',
      top: -1,
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
    const styles = getStyles(this.props, this.context, this.state);

    return (
      <EnhancedButton
        {...other}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchTap={this.handleTouchTap}
        style={styles.root}
      >
        <span style={prepareStyles(styles.label)}>{year}</span>
      </EnhancedButton>
    );
  }
}

export default YearButton;
