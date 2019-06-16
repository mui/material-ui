import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeNode from '@material-ui/lab/TreeNode';

function TreeViewDemo() {
  return (
    <TreeView collapseIcon={<ExpandMoreIcon />} expandIcon={<ChevronRightIcon />}>
      <TreeNode id="1" label="Applications: ">
        <TreeNode id="2" label="Calendar : app" />
        <TreeNode id="3" label="Chrome : app" />
        <TreeNode id="4" label="Webstorm : app" />
      </TreeNode>
      <TreeNode id="5" label="Documents: ">
        <TreeNode id="6" label="Material-UI : app">
          <TreeNode id="7" label="src : ">
            <TreeNode id="8" label="index : ts" />
            <TreeNode id="9" label="bootstrap : ts" />
          </TreeNode>
        </TreeNode>
      </TreeNode>
    </TreeView>
  );
}

export default TreeViewDemo;
