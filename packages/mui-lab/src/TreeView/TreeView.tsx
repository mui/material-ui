import * as React from 'react';
import { TreeView as XTreeView, TreeViewProps } from '@mui/x-tree-view/TreeView';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The TreeView component was moved from `@mui/lab` to `@mui/x-tree-view`.',
        'The component will no longer be exported from `@mui/lab` in the first release of October 2023.',
        '',
        "You should use `import { TreeView } from '@mui/x-tree-view'`",
        "or `import { TreeView } from '@mui/x-tree-view/TreeView'`",
        '',
        'More information about this migration on our blog: INSERT BLOG POST.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

/**
 * @ignore - do not document.
 */
const TreeView = React.forwardRef(function DeprecatedTreeView(
  props: TreeViewProps,
  ref: React.Ref<HTMLUListElement>,
) {
  warn();

  return <XTreeView {...props} ref={ref} />;
});

export default TreeView;
