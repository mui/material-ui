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

export default function RecursiveTreeView() {
  const classes = useStyles();

  const TreeRender = (data: TreeRenderProps) => {
    if (Array.isArray(data.children)) {
      return (
        <TreeItem key={data.name} nodeId={data.name} label={data.name}>
          {data.children.map((node, idx) => TreeRender(node))}
        </TreeItem>
      );
    }
    return <TreeItem key={data.name} nodeId={data.name} label={data.name} />;
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

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

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
