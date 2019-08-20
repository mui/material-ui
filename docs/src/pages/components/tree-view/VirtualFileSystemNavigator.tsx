import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView, { NodeInfo } from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles({
  root: {
    height: 216,
  },
});

const dataItems = [
  {
    nodeId: '1',
    label: 'Applications',
    children: [
      {
        nodeId: '2',
        label: 'Calendar',
      },
      {
        nodeId: '3',
        label: 'Chrome',
      },
      {
        nodeId: '4',
        label: 'Webstorm',
      },
    ],
  },
  {
    nodeId: '5',
    label: 'Documents',
    children: [
      {
        nodeId: '6',
        label: 'Material-UI',
        children: [
          {
            nodeId: '7',
            label: 'src',
            children: [
              {
                nodeId: '8',
                label: 'index.js',
              },
              {
                nodeId: '9',
                label: 'tree-view.js',
              },
            ],
          },
        ],
      },
    ],
  },
];

interface Data {
  nodeId: string;
  label: string;
  parent?: string | number;
  children?: Data[];
}

let visibleChildren: Data[] = [];

const getItems = (nodeId: string | number | undefined): NodeInfo[] | undefined => {
  let nodeChildren;
  if (nodeId) {
    const parent = visibleChildren.find(child => child.nodeId === nodeId);
    if (parent && parent.children) {
      nodeChildren = parent.children.map(child => {
        return { ...child, parent: nodeId };
      });
    }
  } else {
    nodeChildren = dataItems;
  }
  if (nodeChildren) visibleChildren = [...visibleChildren, ...nodeChildren];
  return nodeChildren;
};

const isExpandable = (nodeId: string | number | undefined) => {
  const parent = visibleChildren.find(child => child.nodeId === nodeId);
  if (parent) {
    return parent.children !== undefined;
  }
  return false;
};

const itemCollapse = (nodeId: string | number | undefined) => {
  visibleChildren = visibleChildren.filter(node => node.parent !== nodeId);
};

export default function FileSystemNavigator() {
  const classes = useStyles();
  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeExpanded={getItems}
      onNodeCollapsed={itemCollapse}
      isNodeExpandable={isExpandable}
    />
  );
}
