import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles({
  root: {
    height: 216,
  },
});

function handleClick(event) {
  event.preventDefault();
  alert('You clicked a leaf node.');
}

export default function FileSystemNavigator() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" onClick={handleClick} />
        <TreeItem nodeId="3" label="Chrome" onClick={handleClick} />
        <TreeItem nodeId="4" label="Webstorm" onClick={handleClick} />
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="6" label="Material-UI">
          <TreeItem nodeId="7" label="src" >
            <TreeItem nodeId="8" label="index.js" onClick={handleClick} />
            <TreeItem nodeId="9" label="tree-view.js" onClick={handleClick} />
          </TreeItem>
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
}
