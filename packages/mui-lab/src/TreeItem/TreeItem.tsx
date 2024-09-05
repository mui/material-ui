'use client';
import * as React from 'react';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The TreeItem component was moved from `@mui/lab` to `@mui/x-tree-view`.',
        '',
        "You should use `import { TreeItem } from '@mui/x-tree-view'`",
        "or `import { TreeItem } from '@mui/x-tree-view/TreeItem'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-tree-view-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type TreeItemComponent = ((
  props: TreeItemProps & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { propTypes?: any };

/**
 * @deprecated The TreeItem component was moved from `@mui/lab` to `@mui/x-tree-view`. More information about this migration on our blog: https://mui.com/blog/lab-tree-view-to-mui-x/.
 * @ignore - do not document.
 */
const TreeItem = React.forwardRef(function DeprecatedTreeItem() {
  warn();

  return null;
}) as TreeItemComponent;

export default TreeItem;

export type TreeItemProps = Record<any, any>;
