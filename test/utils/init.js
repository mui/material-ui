import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as testingLibrary from '@testing-library/react/pure';
import './initMatchers';

// Enable missing act warnings: https://github.com/facebook/react/blob/v16.13.1/packages/react-reconciler/src/ReactFiberHooks.js#L965
// TODO: Revisit once https://github.com/facebook/react/issues/15439 is resolved.
global.jest = null;

enzyme.configure({ adapter: new Adapter() });

// checking if an element is hidden is quite expensive
// this is only done in CI as a fail safe. It can still explicitly be checked
// in the test files which helps documenting what is part of the DOM but hidden
// from assistive technology
const defaultHidden = !process.env.CI;
// adds verbosity for something that might be confusing
console.warn(`${defaultHidden ? 'including' : 'excluding'} inaccessible elements by default`);
testingLibrary.configure({ defaultHidden });
