import React from 'react';
import cx from 'classnames';
import MuiChip from '@material-ui/core/Chip';
import { CHIP } from '../../theme/core';

const Chip = ({ className, inverted, ...props }) => (
  <MuiChip
    className={cx(CHIP.root, className, inverted && CHIP.inverted)}
    classes={{
      label: CHIP.label,
    }}
    {...props}
  />
);

export default Chip;
