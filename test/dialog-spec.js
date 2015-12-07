import React from 'react/addons';
import Dialog from 'dialog';
import {spy} from 'sinon';
import TestUtils from 'react-addons-test-utils';

describe('Dialog', () => {
  it('appends a dialog to the document body', () => {
    let testClass = 'test-dialog-class';
    TestUtils.renderIntoDocument(
      <Dialog
        open={true}
        contentClassName={testClass} />
    );

    let dialogEl = document.getElementsByClassName(testClass)[0];
    expect(dialogEl).to.be.ok;
  });

  it('registers events on dialog actions', () => {
    let clickSpy = spy();
    let testClass = 'dialog-action';

    TestUtils.renderIntoDocument(
      <Dialog
        open={true}
        actions={[
          <button
            key="a"
            onClick={clickSpy}
            className={testClass}>
            test
          </button>,
        ]} />
    );

    let actionEl = document.getElementsByClassName(testClass)[0];
    expect(actionEl).to.be.ok;

    TestUtils.Simulate.click(actionEl);
    expect(clickSpy.called).to.be.ok;
  });
});
