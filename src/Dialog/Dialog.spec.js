/* eslint-env mocha */
import React from 'react';
import Dialog from './Dialog';
import {spy} from 'sinon';
import {mount} from 'enzyme';
import {assert} from 'chai';
import TestUtils from 'react-addons-test-utils';
import getMuiTheme from '../styles/getMuiTheme';

describe('<Dialog />', () => {
  const muiTheme = getMuiTheme();
  const mountWithContext = (node) => mount(node, {context: {muiTheme}});

  it('appends a dialog to the document body', () => {
    const testClass = 'test-dialog-class';
    mountWithContext(
      <Dialog
        open={true}
        contentClassName={testClass}
      />
    );

    const dialogEl = document.getElementsByClassName(testClass)[0];
    assert.ok(dialogEl);
  });

  it('registers events on dialog actions', () => {
    const clickSpy = spy();
    const testClass = 'dialog-action';

    mountWithContext(
      <Dialog
        open={true}
        actions={[
          <button
            key="a"
            onClick={clickSpy}
            className={testClass}
          >
            test
          </button>,
        ]}
      />
    );

    const actionEl = document.getElementsByClassName(testClass)[0];
    assert.ok(actionEl);

    TestUtils.Simulate.click(actionEl);
    assert.ok(clickSpy.called);
  });
});
