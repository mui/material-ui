import PropTypes from 'prop-types';
import { createGrid } from '@mui/system/Grid';
import { OverridableComponent } from '@mui/types';
import { styled, useThemeProps } from '../styles';
import { GridTypeMap } from './GridProps';

const Grid = createGrid({
  createStyledComponent: styled('div', {
    name: 'MuiGrid',
    overridesResolver: (props, styles) => styles.root,
  }),
  componentName: 'MuiGrid',
  useThemeProps: (inProps) => useThemeProps({ props: inProps, name: 'MuiGrid' }),
}) as OverridableComponent<GridTypeMap>;

Grid.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default Grid;
