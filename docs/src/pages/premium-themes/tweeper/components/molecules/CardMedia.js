import React from 'react';
import clsx from 'clsx';
import MuiCardActions from '@material-ui/core/CardActions';
import { CARD_MEDIA } from '../../theme/core';

const CardActions = ({ className, wideScreen, ...props }) => (
  <MuiCardActions
    className={clsx(CARD_MEDIA.root, className, wideScreen && CARD_MEDIA.wideScreen)}
    {...props}
  />
);

export default CardActions;
