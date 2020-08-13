import * as React from 'react';
import PropTypes from 'prop-types';
import ListContext from '../List/ListContext';

/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 */
const ListItemIcon = React.forwardRef(function ListItemIcon(props, ref) {
  const { classes, className, components = {}, ...other } = props;
  const context = React.useContext(ListContext);
  const Root = components.root || 'div';
  return <Root className={className} alignItems={context.alignItems} ref={ref} {...other} />;
});

ListItemIcon.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component, normally `Icon`, `SvgIcon`,
   * or a `@material-ui/icons` SVG icon element.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  components: PropTypes.shape({ root: PropTypes.component }),
};

export default ListItemIcon;
