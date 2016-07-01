/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {assert} from 'chai';
import {stub} from 'sinon';
import DatePicker from './DatePicker';
import getMuiTheme from '../styles/getMuiTheme';

describe('<DatePicker />', () => {
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
        <DatePicker value="2016-03-21" />
      );
      assert.strictEqual(consoleStub.callCount, 1);
      assert.deepEqual(
        consoleStub.args[0][0].split('\n'),
        [
          'Warning: Failed prop type: Invalid prop `value` of type `string` ' +
          'supplied to `DatePicker`, expected `object`.',
          '    in DatePicker',
        ]
      );
    });

    it('should not throw when using a valid properties', () => {
      shallowWithContext(
        <DatePicker value={new Date()} />
      );
      assert.strictEqual(consoleStub.callCount, 0);
    });
  });
});
