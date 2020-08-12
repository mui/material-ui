import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import ListContext from '../List/ListContext';

const shouldForwardProp = (prop) => isPropValid(prop);

const Root = styled('div', { shouldForwardProp })(props => ({
  minWidth: 56,
  color: props.theme.palette.action.active,
  flexShrink: 0,
  display: 'inline-flex',
  ...(props.alignItems === 'flex-start' && {
    marginTop: 8,
  })
}))

/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 */
const ListItemIcon = React.forwardRef(function ListItemIcon(props, ref) {
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
};

export default ListItemIcon;
