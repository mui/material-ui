/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import {stub} from 'sinon';
import TimePicker from './TimePicker';
import getMuiTheme from '../styles/getMuiTheme';

describe('<TimePicker />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  describe('propTypes', () => {
    let consoleStub;

    beforeEach(() => {
      consoleStub = stub(console, 'error');
    });

    afterEach(() => {
      console.error.restore(); // eslint-disable-line no-console
    });

    it('should throw when using wrong properties', () => {
      shallowWithContext(
        <TimePicker value="2016-03-21" />
      );
      assert.strictEqual(consoleStub.callCount, 1);
      assert.strictEqual(
        consoleStub.args[0][0],
        'Warning: Failed propType: Invalid prop `value` of type `string` supplied to `TimePicker`, expected `object`.'
      );
    });

    it('should not throw when using a valid properties', () => {
      shallowWithContext(
        <TimePicker value={new Date()} />
      );
      assert.strictEqual(consoleStub.callCount, 0);
    });
  });
});
