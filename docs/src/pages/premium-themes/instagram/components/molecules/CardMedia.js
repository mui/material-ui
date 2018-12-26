import React from 'react';
import cx from 'classnames';
import MuiCardActions from '@material-ui/core/CardActions';
import { CARD_MEDIA } from '../../theme/core';

const CardActions = ({ className, wideScreen, ...props }) => (
  <MuiCardActions
    className={cx(CARD_MEDIA.root, className, wideScreen && CARD_MEDIA.wideScreen)}
    {...props}
  />
);

export default CardActions;
