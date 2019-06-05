import React from 'react';
import clsx from 'clsx';
import MuiChip from '@material-ui/core/Chip';
import { CHIP } from '../../theme/core';

const Chip = ({ className, inverted, ...props }) => (
  <MuiChip
    className={clsx(CHIP.root, className, inverted && CHIP.inverted)}
    classes={{
      label: CHIP.label,
    }}
    {...props}
  />
);

export default Chip;
