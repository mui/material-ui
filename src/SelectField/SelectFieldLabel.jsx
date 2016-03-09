import React from 'react';
import DropDownArrow from '../svg-icons/navigation/arrow-drop-down';

const getStyles = (props) => {
  const {
    disabled,
    style,
  } = props;

  const {palette, dropDownMenu} = props.muiTheme;
  const {accentColor} = dropDownMenu;
  const {marginTop} = style || {};

  return {
    label: {
      color: disabled ? palette.disabledColor : palette.textColor,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: 1,
      position: 'absolute',
      paddingTop: (marginTop || 0) + 12, // just like magic
      width: '100%',
      height: '100%',
      outline: 'none',
    },
    icon: {
      fill: accentColor,
      position: 'absolute',
      right: 0,
      top: 14,
    },
  };
};

                        // this can't be stateless
                        // as we want to call focus on it
                        // react-warpgate may help
const SelectFieldLabel = React.createClass({
  propTypes: {
    iconStyle: React.PropTypes.object,
    labelStyle: React.PropTypes.object,
    muiTheme: React.PropTypes.object,
    onBlur: React.PropTypes.func.isRequired,
    onFocus: React.PropTypes.func.isRequired,
    onTouchTap: React.PropTypes.func.isRequired,
    value: React.PropTypes.any,
  },

  render() {
    const {
      iconStyle,
      labelStyle,
      muiTheme,
      value,
      ...other,
    } = this.props;
    const styles = getStyles(this.props);
    const {prepareStyles} = muiTheme;

    return (
      <label
        tabIndex={0}
        {...other}
        style={prepareStyles(styles.label, labelStyle)}
      >
        {value}
        <DropDownArrow style={Object.assign({}, styles.icon, iconStyle)} />
      </label>
    );
  },
});

export default SelectFieldLabel;
