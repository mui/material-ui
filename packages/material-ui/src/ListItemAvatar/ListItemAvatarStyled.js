import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import withStyles from '../styles/withStyles';
import ListContext from '../List/ListContext';

const shouldForwardProp = (prop) =>
  isPropValid(prop) && prop !== 'disabled';

const Root = styled('div', { shouldForwardProp })(props => ({
  minWidth: 56,
  flexShrink: 0,
  ...(props.alignItems === 'flex-start' && {
    marginTop: 8,
  }),
}));

/**
 * A simple wrapper to apply `List` styles to an `Avatar`.
 */
const ListItemAvatar = React.forwardRef(function ListItemAvatar(props, ref) {
  const { classes, className, ...other } = props;
  const context = React.useContext(ListContext);

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
};

export default ListItemAvatar;
