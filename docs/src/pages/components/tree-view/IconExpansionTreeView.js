import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem, { TreeItemIcon } from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
});

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
    handleExpansion,
    handleSelection,
    onMouseDown,
    expansionIcon,
    displayIcon,
    icon: iconProp,
    ...rest
  } = props;

  const icon = iconProp || expansionIcon || displayIcon;

  return (
    // Key events handled on li
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
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
      onMouseDown={onMouseDown}
      ref={ref}
      {...rest}
    >
      <TreeItemIcon
        onClick={icon ? handleExpansion : handleSelection}
        className={classes.iconContainer}
        icon={icon}
      />
      <Typography onClick={handleSelection} component="div" className={classes.label}>
        {label}
      </Typography>
    </div>
  );
});

TreeItemContent.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  displayIcon: PropTypes.node,
  expanded: PropTypes.bool,
  expansionIcon: PropTypes.node,
  focused: PropTypes.bool,
  handleExpansion: PropTypes.func,
  handleSelection: PropTypes.func,
  icon: PropTypes.node,
  label: PropTypes.node,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  selected: PropTypes.bool,
};

const CustomTreeItemContent = withStyles(styles)(TreeItemContent);

const CustomTreeItem = (props) => (
  <TreeItem TreeItemContentComponent={CustomTreeItemContent} {...props} />
);

export default function IconExpansionTreeView() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <CustomTreeItem nodeId="1" label="Applications">
        <CustomTreeItem nodeId="2" label="Calendar" />
        <CustomTreeItem nodeId="3" label="Chrome" />
        <CustomTreeItem nodeId="4" label="Webstorm" />
      </CustomTreeItem>
      <CustomTreeItem nodeId="5" label="Documents">
        <CustomTreeItem nodeId="10" label="OSS" />
        <CustomTreeItem nodeId="6" label="Material-UI">
          <CustomTreeItem nodeId="7" label="src">
            <CustomTreeItem nodeId="8" label="index.js" />
            <CustomTreeItem nodeId="9" label="tree-view.js" />
          </CustomTreeItem>
        </CustomTreeItem>
      </CustomTreeItem>
    </TreeView>
  );
}
