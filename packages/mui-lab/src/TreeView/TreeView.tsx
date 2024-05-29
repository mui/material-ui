'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The TreeView component was moved from `@mui/lab` to `@mui/x-tree-view`.',
        '',
        "You should use `import { TreeView } from '@mui/x-tree-view'`",
        "or `import { TreeView } from '@mui/x-tree-view/TreeView'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-tree-view-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type TreeViewComponent<Multiple extends boolean | undefined = undefined> = ((
  props: TreeViewProps<Multiple> & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { propTypes?: any };

/**
 * @deprecated The TreeView component was moved from `@mui/lab` to `@mui/x-tree-view`. More information about this migration on our blog: https://mui.com/blog/lab-tree-view-to-mui-x/.
 * @ignore - do not document.
 */
const TreeView = React.forwardRef(function DeprecatedTreeView() {
  warn();

  return null;
}) as TreeViewComponent;

export default TreeView;

export type TreeViewProps<Multiple> = Record<any, any>;
