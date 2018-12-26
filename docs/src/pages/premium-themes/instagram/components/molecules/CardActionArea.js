import React from 'react';
import cx from 'classnames';
import MuiCardActionArea from '@material-ui/core/CardActionArea';
import { CARD_ACTION_AREA } from '../../theme/core';

const CardActionArea = ({ className, ...props }) => (
  <MuiCardActionArea className={cx(CARD_ACTION_AREA.root, className)} {...props} />
);

export default CardActionArea;
