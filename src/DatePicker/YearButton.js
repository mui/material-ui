import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import classNames from 'classnames';

import EnhancedButton from '../internal/EnhancedButton';

const styleSheet = createStyleSheet('YearButton', (theme) => {
  const {
    baseTheme,
    datePicker,
  } = theme;

  return {
    root: {
      boxSizing: 'border-box',
      display: 'block',
      margin: '0 auto',
      position: 'relative',
      textAlign: 'center',
      lineHeight: 'inherit',
      WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', // Remove mobile color flashing (deprecated)
    },
    label: {
      alignSelf: 'center',
      position: 'relative',
      top: -1,
      fontWeight: 400,
      fontSize: 17,
      color: baseTheme.palette.textColor,
      '&:hover': {
        color: datePicker.color,
        fontWeight: 450,
        '& labelSelected': {
          fontWeight: 500,
        },
      },
    },
    labelSelected: {
      color: datePicker.color,
      fontSize: 26,
    },
  };
});

class YearButton extends Component {
  static propTypes = {
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

  handleTouchTap = (event) => {
    if (this.props.onTouchTap) {
      this.props.onTouchTap(event, this.props.year);
    }
  };

  render() {
    const classes = this.context.muiTheme.styleManager.render(styleSheet);

    const {
      className, // eslint-disable-line no-unused-vars
      onTouchTap, // eslint-disable-line no-unused-vars
      selected, // eslint-disable-line no-unused-vars
      year,
      ...other,
    } = this.props;

    const labelClassName = classNames(classes.label, {
      [classes.labelSelected]: selected,
    });

    return (
      <EnhancedButton
        {...other}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onTouchTap={this.handleTouchTap}
        className={classes.root}
      >
        <span className={labelClassName}>
          {year}
        </span>
      </EnhancedButton>
    );
  }
}

export default YearButton;
