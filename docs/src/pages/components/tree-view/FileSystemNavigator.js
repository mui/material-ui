import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

export default function FileSystemNavigator() {
  return (
    <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
      <TreeItem nodeId="1" label="Applications: ">
        <TreeItem nodeId="2" label="Calendar : app" />
        <TreeItem nodeId="3" label="Chrome : app" />
        <TreeItem nodeId="4" label="Webstorm : app" />
      </TreeItem>
      <TreeItem nodeId="5" label="Documents: ">
        <TreeItem nodeId="6" label="Material-UI : app">
          <TreeItem nodeId="7" label="src : ">
            <TreeItem nodeId="8" label="index : js" />
            <TreeItem nodeId="9" label="tree-view : js" />
          </TreeItem>
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
}
