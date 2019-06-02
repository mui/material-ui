import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import TreeView from './TreeView';

describe('<TreeView />', () => {
  let mount;
  const defaultProps = {};

  before(() => {
    mount = createMount({ strict: false });
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render', () => {
    mount(<TreeView {...defaultProps} />);
  });
});
