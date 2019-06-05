import React from 'react';
import clsx from 'clsx';
import MuiCard from '@material-ui/core/Card';
import { CARD } from '../../theme/core';

const Card = ({ className, actionable, contained, spaceGrey, darkBlue, ...props }) => (
  <MuiCard
    className={clsx(
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
