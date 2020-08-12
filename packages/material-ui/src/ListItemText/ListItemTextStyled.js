import * as React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import Typography from '../Typography';
import ListContext from '../List/ListContext';

const shouldForwardProp = (prop) => isPropValid(prop);

const Root = styled('div', { shouldForwardProp })(props => ({
  flex: '1 1 auto',
  minWidth: 0,
  marginTop: 4,
  marginBottom: 4,
  ...(props.multiline && {
    marginTop: 6,
    marginBottom: 6,
  }),
  ...(props.inset && {
    paddingLeft: 56,
  })
}))

const ListItemText = React.forwardRef(function ListItemText(props, ref) {
  const {
    children,
    classes,
    className,
    disableTypography = false,
    inset = false,
    primary: primaryProp,
    primaryTypographyProps,
    secondary: secondaryProp,
    secondaryTypographyProps,
    ...other
  } = props;
  const { dense } = React.useContext(ListContext);

  let primary = primaryProp != null ? primaryProp : children;
  if (primary != null && primary.type !== Typography && !disableTypography) {
    primary = (
      <Typography
        variant={dense ? 'body2' : 'body1'}
        component="span"
        display="block"
        {...primaryTypographyProps}
      >
        {primary}
      </Typography>
    );
  }

  let secondary = secondaryProp;
  if (secondary != null && secondary.type !== Typography && !disableTypography) {
    secondary = (
      <Typography
        variant="body2"
        color="textSecondary"
        display="block"
        {...secondaryTypographyProps}
      >
        {secondary}
      </Typography>
    );
  }

  return (
    <Root
      className={className}
      multiline={primary && secondary}
      dense={dense}
      inset={inset}
      ref={ref}
      {...other}
    >
      {primary}
      {secondary}
    </Root>
  );
});

ListItemText.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Alias for the `primary` prop.
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
   * If `true`, the children won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `children` (or `primary`) text, and optional `secondary` text
   * with the Typography component.
   */
  disableTypography: PropTypes.bool,
  /**
   * If `true`, the children will be indented.
   * This should be used if there is no left avatar or left icon.
   */
  inset: PropTypes.bool,
  /**
   * The main content element.
   */
  primary: PropTypes.node,
  /**
   * These props will be forwarded to the primary typography component
   * (as long as disableTypography is not `true`).
   */
  primaryTypographyProps: PropTypes.object,
  /**
   * The secondary content element.
   */
  secondary: PropTypes.node,
  /**
   * These props will be forwarded to the secondary typography component
   * (as long as disableTypography is not `true`).
   */
  secondaryTypographyProps: PropTypes.object,
};

export default ListItemText;
