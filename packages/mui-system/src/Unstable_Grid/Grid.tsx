import PropTypes from 'prop-types';
import createGrid from './createGrid';
/**
 *
 * Demos:
 *
 * - [Grid (Material UI)](https://mui.com/material-ui/react-grid/)
 *
 * API:
 *
 * - [Grid API](https://mui.com/system/api/grid/)
 */
const Grid = createGrid();

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
   * The number of columns.
   * @default 12
   */
  columns: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.number,
    PropTypes.object,
  ]),
  /**
   * Defines the horizontal space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  columnSpacing: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * If `true`, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   * @default false
   */
  container: PropTypes.bool,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'row'
   */
  direction: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
    PropTypes.arrayOf(PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])),
    PropTypes.object,
  ]),
  /**
   * If `true`, the negative margin and padding are apply only to the top and left sides of the grid.
   */
  disableEqualOverflow: PropTypes.bool,
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `lg` breakpoint and wider screens if not overridden.
   * @default false
   */
  lg: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.bool]),
  /**
   * If a number, it sets the margin-left equals to the number of columns the grid item uses.
   * If 'auto', the grid item push itself to the right-end of the container.
   * The value is applied for the `lg` breakpoint and wider screens if not overridden.
   */
  lgOffset: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `md` breakpoint and wider screens if not overridden.
   * @default false
   */
  md: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.bool]),
  /**
   * If a number, it sets the margin-left equals to the number of columns the grid item uses.
   * If 'auto', the grid item push itself to the right-end of the container.
   * The value is applied for the `md` breakpoint and wider screens if not overridden.
   */
  mdOffset: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
  /**
   * Defines the vertical space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  rowSpacing: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `sm` breakpoint and wider screens if not overridden.
   * @default false
   */
  sm: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.bool]),
  /**
   * If a number, it sets the margin-left equals to the number of columns the grid item uses.
   * If 'auto', the grid item push itself to the right-end of the container.
   * The value is applied for the `sm` breakpoint and wider screens if not overridden.
   */
  smOffset: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
  /**
   * Defines the space between the type `item` components.
   * It can only be used on a type `container` component.
   * @default 0
   */
  spacing: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   * @default 'wrap'
   */
  wrap: PropTypes.oneOf(['nowrap', 'wrap-reverse', 'wrap']),
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for the `xl` breakpoint and wider screens if not overridden.
   * @default false
   */
  xl: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.bool]),
  /**
   * If a number, it sets the margin-left equals to the number of columns the grid item uses.
   * If 'auto', the grid item push itself to the right-end of the container.
   * The value is applied for the `xl` breakpoint and wider screens if not overridden.
   */
  xlOffset: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
  /**
   * If a number, it sets the number of columns the grid item uses.
   * It can't be greater than the total number of columns of the container (12 by default).
   * If 'auto', the grid item's width matches its content.
   * If false, the prop is ignored.
   * If true, the grid item's width grows to use the space available in the grid container.
   * The value is applied for all the screen sizes with the lowest priority.
   * @default false
   */
  xs: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.bool]),
  /**
   * If a number, it sets the margin-left equals to the number of columns the grid item uses.
   * If 'auto', the grid item push itself to the right-end of the container.
   * The value is applied for the `xs` breakpoint and wider screens if not overridden.
   */
  xsOffset: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
} as any;

export default Grid;
