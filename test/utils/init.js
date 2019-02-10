import enzyme from 'enzyme/build/index';
import Adapter from 'enzyme-adapter-react-16';
import consoleError from './consoleError';
import React from 'react';

// Waiting for https://github.com/airbnb/enzyme/issues/1875
React.memo = x => x;

consoleError();

enzyme.configure({ adapter: new Adapter() });
