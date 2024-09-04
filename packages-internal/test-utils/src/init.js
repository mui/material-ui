import * as testingLibrary from '@testing-library/react/pure';
import './initMatchers';

// checking if an element is hidden is quite expensive
// this is only done in CI as a fail safe. It can still explicitly be checked
// in the test files which helps documenting what is part of the DOM but hidden
// from assistive technology
const defaultHidden = !process.env.CI;
testingLibrary.configure({ defaultHidden });
