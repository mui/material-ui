import * as React from 'react';
import PropTypes from 'prop-types';
import { TreeItem as XTreeItem, TreeItemProps } from '@mui/x-tree-view/TreeItem';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The TreeItem component was moved from `@mui/lab` to `@mui/x-tree-view`.',
        'The component will no longer be exported from `@mui/lab` in the first release of October 2023.',
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

/**
 * @deprecated The TreeItem component was moved from `@mui/lab` to `@mui/x-tree-view`. More information about this migration on our blog: https://mui.com/blog/lab-tree-view-to-mui-x/.
 * @ignore - do not document.
 */
const TreeItem = React.forwardRef(function DeprecatedTreeItem(
  props: TreeItemProps,
  ref: React.Ref<HTMLLIElement>,
) {
  warn();

  return <XTreeItem {...props} ref={ref} />;
});

TreeItem.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
} as any;

export default TreeItem;
