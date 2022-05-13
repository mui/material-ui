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
  // eslint-disable-next-line material-ui/mui-name-matches-component-name
  useThemeProps: (inProps) => useThemeProps({ props: inProps, name: 'MuiGrid' }),
}) as OverridableComponent<GridTypeMap>;

export default Grid;
