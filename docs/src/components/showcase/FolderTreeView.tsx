/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { TreeView } from '@mui/x-tree-view/TreeView';
import {
  TreeItem,
  useTreeItem,
  TreeItemProps,
  TreeItemContentProps,
} from '@mui/x-tree-view/TreeItem';
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

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    preventSelection(event);
  };

  const handleExpansionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleSelection(event);
  };

  return (
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      // @ts-ignore
      onClick={handleExpansionClick}
      // @ts-ignore
      onMouseDown={handleMouseDown}
      // @ts-ignore
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
    </div>
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
      '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        left: -14,
        height: '100%',
        width: 1.5,
        backgroundColor: (theme.vars || theme).palette.grey[200],
      },
    },
    '& .MuiTreeItem-group': {
      marginLeft: 0,
      paddingLeft: theme.spacing(3),
    },
  },
  theme.applyDarkStyles({
    '& .MuiTreeItem-root': {
      '&::before': {
        backgroundColor: (theme.vars || theme).palette.primaryDark[600],
      },
    },
    '& .MuiTreeItem-group': {
      '& .MuiTreeItem-content': {
        '&::before': {
          backgroundColor: (theme.vars || theme).palette.primaryDark[600],
        },
      },
    },
  }),
]);

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: TreeItemProps & {
    ContentProps?: { lastNestedChild?: boolean };
  },
  ref: React.Ref<HTMLLIElement>,
) {
  return <StyledTreeItem ContentComponent={CustomContent} {...props} ref={ref} />;
});

export default function FolderTreeView() {
  return (
    <TreeView
      aria-label="folder"
      defaultExpanded={['1', '2', '5', '7']}
      defaultCollapseIcon={<KeyboardArrowUpRounded sx={{ fontSize: 16, color: 'primary.main' }} />}
      defaultExpandIcon={<KeyboardArrowDownRounded sx={{ fontSize: 16, color: 'grey.600' }} />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ p: 1, overflowY: 'auto' }}
    >
      <CustomTreeItem nodeId="1" label="src">
        <CustomTreeItem nodeId="2" label="components">
          <CustomTreeItem nodeId="3" label="Button.tsx" ContentProps={{ lastNestedChild: true }} />
          <CustomTreeItem nodeId="4" label="Drawer.tsx" ContentProps={{ lastNestedChild: true }} />
          <CustomTreeItem nodeId="5" label="Navbar.tsx" ContentProps={{ lastNestedChild: true }} />
          <CustomTreeItem
            nodeId="6"
            label="TreeView.tsx"
            ContentProps={{ lastNestedChild: true }}
          />
        </CustomTreeItem>
        <CustomTreeItem nodeId="7" label="blocks">
          <CustomTreeItem
            nodeId="8"
            label="SignUpPage.tsx"
            ContentProps={{ lastNestedChild: true }}
          />
          <CustomTreeItem nodeId="9" label="PricingTable.tsx">
            <CustomTreeItem
              nodeId="10"
              label="PaymentOptions.tsx"
              ContentProps={{ lastNestedChild: true }}
            />
            <CustomTreeItem
              nodeId="11"
              label="EarlyBirdDiscount.tsx"
              ContentProps={{ lastNestedChild: true }}
            />
          </CustomTreeItem>
        </CustomTreeItem>
      </CustomTreeItem>
    </TreeView>
  );
}
