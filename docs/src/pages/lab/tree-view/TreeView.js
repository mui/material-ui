import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import TreeNode from '@material-ui/lab/TreeNode';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FolderIcon from '@material-ui/icons/Folder';

function TreeViewDemo() {
  return (
    <TreeView
      collapseIcon={<ExpandLessIcon />}
      defaultNodeIcon={<FolderIcon />}
      expandIcon={<ExpandMoreIcon />}
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
