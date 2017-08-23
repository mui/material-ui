// @flow
// @inheritedComponent ButtonBase

import React from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import { capitalizeFirstLetter } from '../utils/helpers';
import Icon from '../Icon';

export const styles = (theme: Object) => ({
  root: {
    ...theme.typography.button,
    maxWidth: 264,
    minWidth: 72,
    background: 'none',
    padding: 0,
    height: 48,
    flex: 'none',
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      minWidth: 160,
    },
  },
  rootLabelIcon: {
    height: 72,
  },
  rootAccent: {
    color: theme.palette.text.secondary,
  },
  rootAccentSelected: {
    color: theme.palette.accent.A200,
  },
  rootAccentDisabled: {
    color: theme.palette.text.disabled,
  },
  rootPrimary: {
    color: theme.palette.text.secondary,
  },
  rootPrimarySelected: {
    color: theme.palette.primary[500],
  },
  rootPrimaryDisabled: {
    color: theme.palette.text.disabled,
  },
  rootInherit: {
    color: 'inherit',
    opacity: 0.7,
  },
  rootInheritSelected: {
    opacity: 1,
  },
  rootInheritDisabled: {
    opacity: 0.4,
  },
  fullWidth: {
    flexGrow: 1,
  },
  labelContainer: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
    },
  },
  label: {
    fontSize: theme.typography.fontSize,
    whiteSpace: 'normal',
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.fontSize - 1,
    },
  },
  labelWrapped: {
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.fontSize - 2,
    },
  },
});

type DefaultProps = {
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
   * If `true`, the tab will be disabled.
   */
  disabled?: boolean,
  /**
   * @ignore
   */
  fullWidth?: boolean,
  /**
   * The icon element. If a string is provided, it will be used as a font ligature.
   */
  icon?: Element<*>,
  /**
   * The label element.
   */
  label?: Element<*>,
  /**
   * @ignore
   */
  onChange?: (event: SyntheticEvent<>, value: any) => void,
  /**
   * @ignore
   */
  onClick?: (event: SyntheticEvent<>) => void,
  /**
   * @ignore
   */
  selected?: boolean,
  /**
   * @ignore
   */
  style?: Object,
  /**
   * @ignore
   */
  textColor?: 'accent' | 'primary' | 'inherit' | string,
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value?: any,
};

type AllProps = DefaultProps & Props;

type State = {
  wrappedText: boolean,
};

class Tab extends React.Component<AllProps, State> {
  props: AllProps;
  static defaultProps = {
    disabled: false,
  };

  state = {
    wrappedText: false,
  };

  componentDidMount() {
    this.checkTextWrap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.wrappedText === prevState.wrappedText) {
      /**
       * At certain text and tab lengths, a larger font size may wrap to two lines while the smaller
       * font size still only requires one line.  This check will prevent an infinite render loop
       * fron occurring in that scenario.
       */
      this.checkTextWrap();
    }
  }

  handleChange = (event: SyntheticEvent<>) => {
    const { onChange, value, onClick } = this.props;

    if (onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  label = undefined;

  checkTextWrap = () => {
    if (this.label) {
      const wrappedText = this.label.getClientRects().length > 1;
      if (this.state.wrappedText !== wrappedText) {
        this.setState({ wrappedText });
      }
    }
  };

  render() {
    const {
      classes,
      className: classNameProp,
      disabled,
      fullWidth,
      icon: iconProp,
      label: labelProp,
      onChange,
      selected,
      style: styleProp,
      textColor,
      value,
      ...other
    } = this.props;

    let icon;

    if (iconProp !== undefined) {
      icon = React.isValidElement(iconProp)
        ? iconProp
        : <Icon>
            {iconProp}
          </Icon>;
    }

    let label;

    if (labelProp !== undefined) {
      label = (
        <div className={classes.labelContainer}>
          <span
            className={classNames(classes.label, {
              [classes.labelWrapped]: this.state.wrappedText,
            })}
            ref={node => {
              this.label = node;
            }}
          >
            {labelProp}
          </span>
        </div>
      );
    }

    const className = classNames(
      classes.root,
      {
        [classes[`root${capitalizeFirstLetter(textColor)}`]]: true,
        [classes[`root${capitalizeFirstLetter(textColor)}Disabled`]]: disabled,
        [classes[`root${capitalizeFirstLetter(textColor)}Selected`]]: selected,
        [classes.rootLabelIcon]: icon && label,
        [classes.fullWidth]: fullWidth,
      },
      classNameProp,
    );

    let style = {};

    if (textColor !== 'accent' && textColor !== 'inherit') {
      style.color = textColor;
    }

    style =
      Object.keys(style).length > 0
        ? {
            ...style,
            ...styleProp,
          }
        : styleProp;

    return (
      <ButtonBase
        focusRipple
        className={className}
        style={style}
        role="tab"
        aria-selected={selected}
        disabled={disabled}
        {...other}
        onClick={this.handleChange}
      >
        {icon}
        {label}
      </ButtonBase>
    );
  }
}

export default withStyles(styles, { name: 'MuiTab' })(Tab);
