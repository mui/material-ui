/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import Drawer from './Drawer';
import getMuiTheme from '../styles/getMuiTheme';

describe('<Drawer />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  describe('propTypes', () => {
    // Since react will console.error propType warnings, that which we'd rather have
    // as errors, we use sinon.js to stub it into throwing these warning as errors
    // instead.
    before(() => {
      sinon.stub(console, 'error', (warning) => {
        throw new Error(warning);
      });
    });

    // In this case there is no need for an assertion since we're only
    // interested in not getting any errors. And mocha will mark the test as a
    // failure if an error is thrown. :)
    it('accepts string in the width props', () => {
      shallowWithContext(
        <Drawer width="100%" />
      );
    });

    it('accepts number in the width props', () => {
      shallowWithContext(
        <Drawer width={400} />
      );
    });
  });
});
