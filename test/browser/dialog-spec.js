import React from 'react';
import Dialog from 'Dialog';
import {spy} from 'sinon';
import TestUtils from 'react-addons-test-utils';

describe('Dialog', () => {
  it('appends a dialog to the document body', () => {
    const testClass = 'test-dialog-class';
    TestUtils.renderIntoDocument(
      <Dialog
        open={true}
        contentClassName={testClass}
      />
    );

    const dialogEl = document.getElementsByClassName(testClass)[0];
    expect(dialogEl).to.be.ok;
  });

  it('registers events on dialog actions', () => {
    const clickSpy = spy();
    const testClass = 'dialog-action';

    TestUtils.renderIntoDocument(
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
    expect(actionEl).to.be.ok;

    TestUtils.Simulate.click(actionEl);
    expect(clickSpy.called).to.be.ok;
  });
});
