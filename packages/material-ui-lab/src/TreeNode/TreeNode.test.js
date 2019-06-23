import React from 'react';
import { assert } from 'chai';
import { createMount } from '@material-ui/core/test-utils';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import TreeNode from './TreeNode';

describe('<TreeNode />', () => {
  let mount;
  const defaultProps = {
    nodeId: 'node1',
  };

  before(() => {
    mount = createMount({ strict: false });
    consoleErrorMock.spy();
  });

  after(() => {
    mount.cleanUp();
    consoleErrorMock.reset();
  });

  it('should render', () => {
    mount(<TreeNode {...defaultProps} />);
    assert.strictEqual(consoleErrorMock.callCount(), 1, 'should call console.error');
    assert.match(
      consoleErrorMock.args()[0][0],
      /Material-UI: A `TreeNode` must be rendered inside a `TreeView`./,
    );
  });
});
