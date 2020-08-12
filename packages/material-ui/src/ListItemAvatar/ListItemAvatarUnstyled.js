import * as React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import ListContext from '../List/ListContext';

/**
 * A simple wrapper to apply `List` styles to an `Avatar`.
 */
const ListItemAvatar = React.forwardRef(function ListItemAvatar(props, ref) {
  const { classes, className, components, ...other } = props;
  const context = React.useContext(ListContext);

  const Root = components.root || 'div';

  return (
    <Root
      className={className}
      alignItems={context.alignItems}
      ref={ref}
      {...other}
    />
  );
});

ListItemAvatar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component – normally `Avatar`.
   */
  children: PropTypes.element.isRequired,
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

export default ListItemAvatar;
