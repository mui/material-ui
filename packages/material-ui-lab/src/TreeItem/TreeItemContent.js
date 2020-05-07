import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import TreeItemIcon from './TreeItemIcon';
import Typography from '@material-ui/core/Typography';
import { fade, withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&$focused': {
      backgroundColor: theme.palette.action.hover,
    },
    '&$selected': {
      backgroundColor: fade(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    },
    '&$selected:hover, &$selected$focused': {
      backgroundColor: fade(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
      ),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  /* Pseudo-class applied to the content element when expanded. */
  expanded: {},
  /* Pseudo-class applied to the content element when selected. */
  selected: {},
  /* Pseudo-class applied to the content element when focused. */
  focused: {},
  /* Styles applied to the label element. */
  label: {
    width: '100%',
    paddingLeft: 4,
    position: 'relative',
  },
  iconContainer: {},
});

const TreeItemContent = React.forwardRef(function TreeItemContent(props, ref) {
  const {
    classes,
    className,
    label,
    expanded,
    selected,
    focused,
    onClick,
    onMouseDown,
    onLabelClick,
    onIconClick,
    icon,
    ...rest
  } = props;

  return (
    <div
      className={clsx(
        classes.root,
        {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
        },
        className,
      )}
      onClick={onClick}
      onMouseDown={onMouseDown}
      ref={ref}
      {...rest}
    >
      <TreeItemIcon onClick={onIconClick} className={classes.iconContainer} icon={icon} />
      <Typography onClick={onLabelClick} component="div" className={classes.label}>
        {label}
      </Typography>
    </div>
  );
});

TreeItemContent.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  expanded: PropTypes.bool,
  focused: PropTypes.bool,
  icon: PropTypes.node,
  label: PropTypes.node,
  onClick: PropTypes.func,
  onIconClick: PropTypes.func,
  onLabelClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  selected: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiTreeItemContent' })(TreeItemContent);
