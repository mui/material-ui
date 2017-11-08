import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EnhancedButton from '../internal/EnhancedButton';

function getStyles(props, context, state) {
  const {selected, year, utils} = props;
  const {baseTheme, datePicker} = context.muiTheme;
  const {hover} = state;

  return {
    root: {
      boxSizing: 'border-box',
      color: year === utils.getYear(new Date()) && datePicker.color,
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
    children: PropTypes.node.isRequired,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    utils: PropTypes.object.isRequired,
    year: PropTypes.number.isRequired,
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

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event, this.props.year);
    }
  };

  render() {
    const {
      children,
      className, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      selected, // eslint-disable-line no-unused-vars
      year, // eslint-disable-line no-unused-vars
      utils, // eslint-disable-line no-unused-vars
      ...other
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
        onClick={this.handleClick}
        style={styles.root}
      >
        <span style={prepareStyles(styles.label)}>
          {children}
        </span>
      </EnhancedButton>
    );
  }
}

export default YearButton;
