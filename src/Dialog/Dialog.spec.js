/* eslint-env mocha */
import React from 'react';
import Dialog from './Dialog';
import {spy} from 'sinon';
import {mount} from 'enzyme';
import {assert} from 'chai';
import TestUtils from 'react-dom/test-utils';
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

  it('should render a inner content container with sharp corners', () => {
    const testClass = 'test-dialog-paper-rounded-class';

    mountWithContext(
      <Dialog
        open={true}
        paperClassName={testClass}
        paperProps={{rounded: false}}
      />
    );

    const testEl = document.getElementsByClassName(testClass)[0];
    assert.strictEqual(testEl.style.borderRadius, '0px');
  });

  describe('should render a custom className', () => {
    const testTitle = 'test-dialog-title';
    const testAction = <button>test</button>;
    const testClasses = {
      root: 'test-dialog-root-class',
      overlay: 'test-dialog-overlay-class',
      body: 'test-dialog-body-class',
      content: 'test-dialog-content-class',
      innerContent: 'test-dialog-paper-class',
      titleContainer: 'test-dialog-title-container-class',
      actionsContainer: 'test-dialog-actions-container-class',
    };

    mountWithContext(
      <Dialog
        open={true}
        title={testTitle}
        actionsContainerClassName={testClasses.actionsContainer}
        bodyClassName={testClasses.body}
        className={testClasses.root}
        contentClassName={testClasses.content}
        paperClassName={testClasses.innerContent}
        overlayClassName={testClasses.overlay}
        titleClassName={testClasses.titleContainer}
        actions={testAction}
      />
    );

    for (const key in testClasses) {
      if (testClasses.hasOwnProperty(key)) {
        const testClass = testClasses[key];

        it(testClass, () => {
          assert.ok(document.getElementsByClassName(testClass)[0]);
        });
      }
    }
  });
});
