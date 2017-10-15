// @flow
// @inheritedComponent ButtonBase

import React from 'react';
import type { Node, Element } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';

export const styles = (theme: Object) => ({
  root: {
    transition: theme.transitions.create(['color', 'padding-top'], {
      duration: theme.transitions.duration.short,
    }),
    paddingTop: 8,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    minWidth: 80,
    maxWidth: 168,
    color: theme.palette.text.secondary,
    flex: '1',
  },
  selected: {
    paddingTop: 6,
    color: theme.palette.primary[500],
  },
  selectedIconOnly: {
    paddingTop: theme.spacing.unit * 2,
  },
  wrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column',
  },
  label: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize - 2,
    opacity: 1,
    transition: 'font-size 0.2s, opacity 0.2s',
    transitionDelay: '0.1s',
  },
  selectedLabel: {
    fontSize: theme.typography.fontSize,
  },
  hiddenLabel: {
    opacity: 0,
    transitionDelay: '0s',
  },
  icon: {
    display: 'block',
    margin: 'auto',
  },
});

type ProvidedProps = {
  classes: Object,
};

export type Props = {
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The icon element. If a string is provided, it will be used as a font ligature.
   */
  icon?: string | Element<any>,
  /**
   * The label element.
   */
  label?: Node,
  /**
   * @ignore
   */
  onChange?: Function,
  /**
   * @ignore
   */
  onClick?: Function,
  /**
   * @ignore
   */
  selected?: boolean,
  /**
   * If `true`, the BottomNavigationButton will show its label.
   */
  showLabel?: boolean,
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value?: any,
};

class BottomNavigationButton extends React.Component<ProvidedProps & Props> {
  handleChange = event => {
    const { onChange, value, onClick } = this.props;

    if (onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  render() {
    const {
      label,
      icon: iconProp,
      selected,
      classes,
      className: classNameProp,
      showLabel: showLabelProp,
      onChange,
      value,
      ...other
    } = this.props;

    const className = classNames(
      classes.root,
      {
        [classes.selected]: selected,
        [classes.selectedIconOnly]: !showLabelProp && !selected,
      },
      classNameProp,
    );

    let icon = null;

    if (iconProp) {
      if (React.isValidElement(iconProp) && typeof iconProp !== 'string') {
        icon = React.cloneElement(iconProp, {
          className: classNames(classes.icon, iconProp.props.className),
        });
      } else {
        icon = <Icon>{iconProp}</Icon>;
      }
    }

    const labelClassName = classNames(classes.label, {
      [classes.selectedLabel]: selected,
      [classes.hiddenLabel]: !showLabelProp && !selected,
    });

    return (
      <ButtonBase className={className} focusRipple {...other} onClick={this.handleChange}>
        <span className={classes.wrapper}>
          {icon}
          <span className={labelClassName}>{label}</span>
        </span>
      </ButtonBase>
    );
  }
}

export default withStyles(styles, { name: 'MuiBottomNavigationButton' })(BottomNavigationButton);
