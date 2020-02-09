import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

interface TreeRenderProps {
  id: string;
  name: string;
  children: TreeRenderProps[] | null;
}

const data: TreeRenderProps = {
  id: 'root',
  name: 'Parent',
  children: [
    {
      id: '1',
      name: 'Child - 1',
      children: [
        {
          id: '2',
          name: 'Child - 2',
          children: [
            {
              id: '3',
              name: 'Child - 3',
              children: null,
            },
          ],
        },
      ],
    },
    {
      id: '4',
      name: 'Child - 4',
      children: [
        {
          id: '5',
          name: 'Child - 5',
          children: null,
        },
      ],
    },
  ],
};

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function RecursiveTreeView() {
  const classes = useStyles();

  const TreeRender = (nodes: TreeRenderProps) => {
    const { children, name } = nodes;
    if (Array.isArray(children)) {
      return (
        <TreeItem key={name} nodeId={name} label={name}>
          {children.map(node => TreeRender(node))}
        </TreeItem>
      );
    }
    return <TreeItem key={name} nodeId={name} label={name} />;
  };

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {TreeRender(data)}
    </TreeView>
  );
}
