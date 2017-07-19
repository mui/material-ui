// @flow

import React from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import SvgIcon from '../SvgIcon';
import type { Icon } from './StepButton';

export const styles = (theme: Object) => ({
  root: {
    fill: theme.palette.action.disabled,
    display: 'block',
  },
  text: {
    fill: theme.palette.getContrastText(theme.palette.primary[500]),
    fontSize: theme.typography.caption.fontSize,
    fontFamily: theme.typography.fontFamily,
  },
  active: {
    fill: theme.palette.primary[500],
  },
});

type ProvidedProps = {
  active: boolean,
  classes: Object,
  position: Icon,
};

export type Props = {
  /**
   * Whether this step is active.
   */
  active?: boolean,
  /**
   * Classses for component style customizations.
   */
  classes: Object,
  /**
   * The step position as a number.
   */
  position?: Icon,
};

function StepPositionIcon(props: ProvidedProps & Props) {
  const { position, classes, active } = props;

  const className = classNames(classes.root, {
    [classes.active]: active,
  });

  return (
    <SvgIcon className={className}>
      <circle cx="12" cy="12" r="10" />
      <text className={classes.text} x="12" y="16" textAnchor="middle">
        {position}
      </text>
    </SvgIcon>
  );
}

StepPositionIcon.muiName = 'StepPositionIcon';

export default withStyles(styles)(StepPositionIcon);
