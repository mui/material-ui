/* eslint-env mocha */
import React from 'react';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import {assert} from 'chai';

import ScApplicationHeader from './ScApplicationHeader';

describe('<ScApplicationHeader />', () => {
    const testChildren = <div className="unique">Hello World</div>;
    const wrapper = shallow(
      <ScApplicationHeader>{testChildren}</ScApplicationHeader>
    );
    
     assert.ok(wrapper.contains(testChildren), 'should contain the children');
});