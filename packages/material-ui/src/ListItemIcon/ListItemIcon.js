import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import ListContext from '../List/ListContext';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    minWidth: 56,
    color: theme.palette.action.active,
    flexShrink: 0,
    display: 'inline-flex',
  },
  /* Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`. */
  alignItemsFlexStart: {
    marginTop: 8,
  },
  /* Styles applied to the root element when `ListItemIcon` enables secondary text. */
  secondaryTextEnabledIconPlacement: {
    display: 'flex',
    alignSelf: 'flex-start',
    marginTop: 6,
  },
});

/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 */
const ListItemIcon = React.forwardRef(function ListItemIcon(props, ref) {
  const { classes, className, secondaryTextEnabled, ...other } = props;
  const context = React.useContext(ListContext);

  return (
    <div
      className={clsx(
        classes.root,
        {
          [classes.secondaryTextEnabledIconPlacement]: secondaryTextEnabled,
          [classes.alignItemsFlexStart]: context.alignItems === 'flex-start',
        },
        className,
      )}
      ref={ref}
      {...other}
    />
  );
});

ListItemIcon.propTypes = {
  /**
   * The content of the component, normally `Icon`, `SvgIcon`,
   * or a `@material-ui/icons` SVG icon element.
   */
  children: PropTypes.element.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  secondaryTextEnabled: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiListItemIcon' })(ListItemIcon);
