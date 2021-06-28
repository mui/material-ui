import enzyme from 'enzyme';
import Adapter from '@eps1lon/enzyme-adapter-react-17';
import * as React from 'react';
import * as testingLibrary from '@testing-library/react/pure';
import './initMatchers';

enzyme.configure({ adapter: new Adapter() });

// checking if an element is hidden is quite expensive
// this is only done in CI as a fail safe. It can still explicitly be checked
// in the test files which helps documenting what is part of the DOM but hidden
// from assistive technology
const defaultHidden = !process.env.CI;
// adds verbosity for something that might be confusing
console.warn(`${defaultHidden ? 'including' : 'excluding'} inaccessible elements by default`);
testingLibrary.configure({ defaultHidden });

// FIXME: Move to testing-library/react
if (React.version.startsWith('18')) {
  testingLibrary.configure({
    asyncWrapper: React.unstable_act,
    eventWrapper: React.unstable_act,
  });
}
