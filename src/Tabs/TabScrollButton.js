// @flow weak

import React from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import KeyboardArrowLeft from '../svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../svg-icons/KeyboardArrowRight';

export const styles = (theme: Object) => ({
  root: {
    color: 'inherit',
    flex: `0 0 ${theme.spacing.unit * 7}px`,
  },
});

type ProvidedProps = {
  classes: Object,
  /**
   * @ignore
   */
  theme?: Object,
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
   * Which direction should the button indicate?
   */
  direction: 'left' | 'right',
  /**
   * Callback to execute for button press.
   */
  onClick?: Function,
  /**
   * Should the button be present or just consume space.
   */
  visible?: boolean,
};

/**
 * @ignore - internal component.
 */
class TabScrollButton extends React.Component<ProvidedProps & Props> {
  static defaultProps = {
    visible: true,
  };

  render() {
    const { classes, className: classNameProp, direction, onClick, visible, ...other } = this.props;

    const className = classNames(classes.root, classNameProp);

    if (!visible) {
      return <div className={className} />;
    }

    return (
      <ButtonBase className={className} onClick={onClick} tabIndex={-1} {...other}>
        {direction === 'left' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </ButtonBase>
    );
  }
}

export default withStyles(styles, { name: 'MuiTabScrollButton' })(TabScrollButton);
