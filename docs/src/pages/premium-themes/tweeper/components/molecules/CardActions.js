import React from 'react';
import clsx from 'clsx';
import MuiCardActions from '@material-ui/core/CardActions';
import { CARD_ACTIONS } from '../../theme/core';

const CardActions = ({ className, contained, ...props }) => (
  <MuiCardActions
    className={clsx(CARD_ACTIONS.root, className, contained && CARD_ACTIONS.contained)}
    classes={{
      action: CARD_ACTIONS.action,
    }}
    {...props}
  />
);

export default CardActions;
