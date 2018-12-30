import React from 'react';
import cx from 'classnames';
import MuiCard from '@material-ui/core/Card';
import { CARD } from '../../theme/core';

const Card = ({ className, actionable, contained, spaceGrey, darkBlue, ...props }) => (
  <MuiCard
    className={cx(
      CARD.root,
      className,
      actionable && CARD.actionable,
      contained && CARD.contained,
      spaceGrey && CARD.spaceGrey,
      darkBlue && CARD.darkBlue,
    )}
    {...props}
  />
);

export default Card;
