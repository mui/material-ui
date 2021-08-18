import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem, { useTreeItem } from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';
import KeyboardArrowUpRounded from '@material-ui/icons/KeyboardArrowUpRounded';
import FolderRounded from '@material-ui/icons/FolderRounded';

const CustomContent = React.forwardRef(function CustomContent(props, ref) {
  const {
    lastNestedChild,
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event) => {
    preventSelection(event);
  };

  const handleExpansionClick = (event) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (event) => {
    handleSelection(event);
  };

  return (
    <button
      type="button"
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onClick={handleExpansionClick}
      onMouseDown={handleMouseDown}
      ref={ref}
    >
      {lastNestedChild ? (
        <Box
          sx={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            bgcolor: 'warning.main',
            display: 'inline-block',
            verticalAlign: 'middle',
            zIndex: 1,
          }}
        />
      ) : (
        <FolderRounded
          sx={{
            fontSize: 16,
            color: nodeId === '1' ? 'primary.main' : 'grey.600',
          }}
        />
      )}

      <Typography
        onClick={handleSelectionClick}
        component="div"
        className={classes.label}
        sx={{
          '&&': {
            color: lastNestedChild ? 'text.secondary' : 'text.primary',
            fontWeight: lastNestedChild ? 400 : 700,
          },
        }}
      >
        {label}
      </Typography>
      {icon}
    </button>
  );
});

CustomContent.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  /**
   * className applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The icon to display next to the tree node's label. Either a parent or end icon.
   */
  displayIcon: PropTypes.node,
  /**
   * The icon to display next to the tree node's label. Either an expansion or collapse icon.
   */
  expansionIcon: PropTypes.node,
  /**
   * The icon to display next to the tree node's label.
   */
  icon: PropTypes.node,
  /**
   * The tree node label.
   */
  label: PropTypes.node,
  lastNestedChild: PropTypes.bool,
  /**
   * The id of the node.
   */
  nodeId: PropTypes.string.isRequired,
};

const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
  '& .MuiTreeItem-content': {
    border: 'none',
    backgroundColor: 'transparent',
    borderRadius: 5,
    padding: theme.spacing(0.5),
    textAlign: 'left',
    position: 'relative',
    zIndex: 1,
  },
  '& .MuiTreeItem-content .MuiTreeItem-label': {
    paddingLeft: theme.spacing(1),
  },
  '& .MuiTreeItem-root': {
    position: 'relative',
    '&:last-of-type': {
      '&:before': {
        height: 34 / 2,
      },
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: -18,
      height: '100%',
      width: 2,
      backgroundColor:
        theme.palette.mode === 'dark'
          ? theme.palette.primaryDark[500]
          : theme.palette.grey[200],
    },
  },
  '& .MuiTreeItem-group': {
    marginLeft: 0,
    paddingLeft: theme.spacing(3),
    '& .MuiTreeItem-content': {
      '&:before': {
        content: '""',
        position: 'absolute',
        display: 'block',
        width: 24,
        height: 2,
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.primaryDark[500]
            : theme.palette.grey[200],
        top: '50%',
        left: 6,
        transform: 'translate(-100%, -50%)',
      },
    },
  },
}));

const CustomTreeItem = (props) => (
  <StyledTreeItem ContentComponent={CustomContent} {...props} />
);

export default function FolderTreeView() {
  return (
    <TreeView
      aria-label="gmail"
      defaultExpanded={['1', '2', '5']}
      defaultCollapseIcon={
        <KeyboardArrowUpRounded sx={{ fontSize: 16, color: 'primary.main' }} />
      }
      defaultExpandIcon={
        <KeyboardArrowDownRounded sx={{ fontSize: 16, color: 'grey.600' }} />
      }
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ p: 1, overflowY: 'auto' }}
    >
      <CustomTreeItem nodeId="1" label="src">
        <CustomTreeItem nodeId="2" label="data">
          <CustomTreeItem
            nodeId="3"
            label="read-and-write.js"
            ContentProps={{ lastNestedChild: true }}
          />
          <CustomTreeItem
            nodeId="4"
            label="authentication-api.js"
            ContentProps={{ lastNestedChild: true }}
          />
        </CustomTreeItem>
        <CustomTreeItem nodeId="5" label="work">
          <CustomTreeItem
            nodeId="6"
            label="job-mapping.js"
            ContentProps={{ lastNestedChild: true }}
          />
        </CustomTreeItem>
      </CustomTreeItem>
    </TreeView>
  );
}
