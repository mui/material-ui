import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import ListItemSecondaryActionBase from './ListItemSecondaryActionUnstyled';

const shouldForwardProp = (prop) => isPropValid(prop);

const Root = styled('div', { shouldForwardProp })((props) => ({
  position: 'absolute',
  right: 16,
  top: '50%',
  transform: 'translateY(-50%)',
  ...(props.disableGutters && {
    right: 0,
  }),
}));

/**
 * Must be used as the last child of ListItem to function properly.
 */
const ListItemSecondaryAction = React.forwardRef(function ListItemSecondaryAction(props, ref) {
  return <ListItemSecondaryActionBase components={{ root: Root }} ref={ref} {...props} />;
});

ListItemSecondaryAction.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component, normally an `IconButton` or selection control.
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

ListItemSecondaryAction.muiName = 'ListItemSecondaryAction';

export default ListItemSecondaryAction;
