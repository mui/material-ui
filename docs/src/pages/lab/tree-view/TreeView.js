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
      <TreeNode title="Test" id="test">
        <TreeNode title="Test-Inner" id="testi">
          <TreeNode title="Test-Inner-Inner" id="testii" />
        </TreeNode>
        <TreeNode title="Test-Inner" id="testi1" />
      </TreeNode>
      <TreeNode title="Test1" id="test1">
        <TreeNode title="Test1-Inner" id="test1i" />
      </TreeNode>
    </TreeView>
  );
}

export default TreeViewDemo;
