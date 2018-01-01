// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import Index from './pages/index';

// $FlowIgnore - we don't want the missing dom element to be a silent error.
ReactDOM.render(<Index />, document.querySelector('#root'));
