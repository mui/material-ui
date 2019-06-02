import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import TreeNode from '@material-ui/lab/TreeNode';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FolderIcon from '@material-ui/icons/Folder';

function TreeViewDemo() {
  return (
    <TreeView
      collapseIcon={<ExpandMoreIcon />}
      defaultNodeIcon={<FolderIcon />}
      expandIcon={<ChevronRightIcon />}
    >
      <TreeNode label="Test" id="test">
        <TreeNode label="Test-Inner" id="testi">
          <TreeNode label="Test-Inner-Inner" id="testii" />
        </TreeNode>
        <TreeNode label="Test-Inner" id="testi1" />
      </TreeNode>
      <TreeNode label="Test1" id="test1">
        <TreeNode label="Test1-Inner" id="test1i" />
      </TreeNode>
    </TreeView>
  );
}

export default TreeViewDemo;
