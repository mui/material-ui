import React from 'react';
import clsx from 'clsx';
import MuiCardContent from '@material-ui/core/CardContent';
import { CARD_CONTENT } from '../../theme/core';

const CardContent = ({ className, ...props }) => (
  <MuiCardContent className={clsx(CARD_CONTENT.root, className)} {...props} />
);

export default CardContent;
