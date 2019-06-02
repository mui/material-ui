import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import TreeNode from './TreeNode';

describe('<TreeNode />', () => {
  let mount;
  const defaultProps = {
    id: 'node1',
  };

  before(() => {
    mount = createMount({ strict: false });
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render', () => {
    mount(<TreeNode {...defaultProps} />);
  });
});
