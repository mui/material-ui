import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { useTreeItem, TreeItemProps, TreeItemContentProps } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRounded from '@mui/icons-material/KeyboardArrowUpRounded';
import FolderRounded from '@mui/icons-material/FolderRounded';

const CustomContent = React.forwardRef(function CustomContent(
  props: TreeItemContentProps & { lastNestedChild?: boolean },
  ref,
) {
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

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    preventSelection(event);
  };

  const handleExpansionClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleSelection(event);
  };

  return (
    /* @ts-ignore -- Key event is handled by the TreeView */
    <Box
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onClick={handleExpansionClick}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLButtonElement>}
    >
      {lastNestedChild ? (
        <Box
          sx={{
            width: 6,
            height: 6,
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
            fontWeight: lastNestedChild ? 400 : 500,
          },
        }}
      >
        {label}
      </Typography>
      {icon}
    </Box>
  );
});

const StyledTreeItem = styled(TreeItem)(({ theme }) => [
  {
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
        backgroundColor: (theme.vars || theme).palette.grey[200],
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
          backgroundColor: (theme.vars || theme).palette.grey[200],
          top: '50%',
          left: 6,
          transform: 'translate(-100%, -50%)',
        },
      },
    },
  },
  theme.applyDarkStyles({
    '& .MuiTreeItem-root': {
      '&:before': {
        backgroundColor: (theme.vars || theme).palette.primaryDark[600],
      },
    },
    '& .MuiTreeItem-group': {
      '& .MuiTreeItem-content': {
        '&:before': {
          backgroundColor: (theme.vars || theme).palette.primaryDark[600],
        },
      },
    },
  }),
]);

function CustomTreeItem(
  props: TreeItemProps & {
    ContentProps?: { lastNestedChild?: boolean };
  },
) {
  return <StyledTreeItem ContentComponent={CustomContent} {...props} />;
}

export default function FolderTreeView() {
  return (
    <TreeView
      aria-label="folder"
      defaultExpanded={['1', '2', '5']}
      defaultCollapseIcon={<KeyboardArrowUpRounded sx={{ fontSize: 16, color: 'primary.main' }} />}
      defaultExpandIcon={<KeyboardArrowDownRounded sx={{ fontSize: 16, color: 'grey.600' }} />}
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
          <CustomTreeItem nodeId="7" label="articles.js" ContentProps={{ lastNestedChild: true }} />
        </CustomTreeItem>
      </CustomTreeItem>
    </TreeView>
  );
}
