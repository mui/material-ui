import React from 'react';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
// import { cleanup, createClientRender } from 'test/utils/createClientRender';
import { cleanup } from 'test/utils/createClientRender';
import Autocomplete from './Autocomplete';

describe('<Autocomplete />', () => {
  let mount;
  let classes;
  // const render = createClientRender({ strict: true });
  const defaultProps = {
    renderInput: () => null,
  };

  before(() => {
    classes = getClasses(<Autocomplete {...defaultProps} />);
    mount = createMount({ strict: true });
  });

  after(() => {
    cleanup();
  });

  describeConformance(<Autocomplete {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    after: () => mount.cleanUp(),
  }));
});
