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
      expandIcon={<ChevronRightIcon />}
      items={[
        {
          id: 1,
          label: 'Applications :',
          children: [
            { id: 2, label: 'Calendar : app' },
            { id: 3, label: 'Chrome : app' },
            { id: 4, label: 'Webstorm : app' },
          ],
        },
        {
          id: 5,
          label: 'Documents :',
          children: [
            {
              id: 6,
              label: 'vuetify :',
              children: [
                {
                  id: 7,
                  label: 'src :',
                  children: [{ id: 8, label: 'index : ts' }, { id: 9, label: 'bootstrap : ts' }],
                },
              ],
            },
            {
              id: 10,
              label: 'material2 :',
              children: [
                {
                  id: 11,
                  label: 'src :',
                  children: [
                    { id: 12, label: 'v-btn : ts' },
                    { id: 13, label: 'v-card : ts' },
                    { id: 14, label: 'v-window : ts' },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 15,
          label: 'Downloads :',
          children: [
            { id: 16, label: 'October : pdf' },
            { id: 17, label: 'November : pdf' },
            { id: 18, label: 'Tutorial : html' },
          ],
        },
        {
          id: 19,
          label: 'Videos :',
          children: [
            {
              id: 20,
              label: 'Tutorials :',
              children: [
                { id: 21, label: 'Basic layouts : mp4' },
                { id: 22, label: 'Advanced techniques : mp4' },
                { id: 23, label: 'All about app : dir' },
              ],
            },
            { id: 24, label: 'Intro : mov' },
            { id: 25, label: 'Conference introduction : avi' },
          ],
        },
      ]}
    />
  );
}

export default TreeViewDemo;
