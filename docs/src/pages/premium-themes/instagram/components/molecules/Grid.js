import React from 'react';
import cx from 'classnames';
import MuiGrid from '@material-ui/core/Grid';
import { GRID } from '../../theme/core';

const Grid = ({ className, flex, ...props }) => (
  <MuiGrid className={cx(GRID.root, className, flex && GRID.flex)} {...props} />
);

export default Grid;
