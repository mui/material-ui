import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeNode from '@material-ui/lab/TreeNode';

export default function SimpleTreeView() {
  return (
    <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
      <TreeNode nodeId="1" label="Applications: ">
        <TreeNode nodeId="2" label="Calendar : app" />
        <TreeNode nodeId="3" label="Chrome : app" />
        <TreeNode nodeId="4" label="Webstorm : app" />
      </TreeNode>
      <TreeNode nodeId="5" label="Documents: ">
        <TreeNode nodeId="6" label="Material-UI : app">
          <TreeNode nodeId="7" label="src : ">
            <TreeNode nodeId="8" label="index : js" />
            <TreeNode nodeId="9" label="tree-view : js" />
          </TreeNode>
        </TreeNode>
      </TreeNode>
    </TreeView>
  );
}
